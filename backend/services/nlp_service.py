import re
import sys
import os
import nltk

# Ensure required NLTK resources are available
for resource in ['stopwords', 'wordnet', 'omw-1.4']:
    try:
        nltk.data.find(f'corpora/{resource}')
    except LookupError:
        nltk.download(resource, quiet=True)

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

STOP_WORDS = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

RED_FLAG_KEYWORDS = [
    'earn from home', 'no experience needed', 'unlimited earnings',
    'work from home', 'be your own boss', 'financial freedom',
    'wire transfer', 'money order', 'western union', 'send money',
    'guaranteed income', 'no investment', 'passive income',
    'multi level', 'mlm', 'pyramid', 'commission only',
    'immediate hiring', 'urgently needed', 'apply now limited',
    'whatsapp', 'telegram', 'click here', 'limited slots'
]

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'http\S+|www\S+', '', text)   # remove URLs
    text = re.sub(r'[^a-z\s]', '', text)          # remove special chars
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = text.split()
    tokens = [lemmatizer.lemmatize(t) for t in tokens if t not in STOP_WORDS]
    return ' '.join(tokens)

def count_red_flags(text: str) -> int:
    if not isinstance(text, str):
        return 0
    text = text.lower()
    return sum(1 for kw in RED_FLAG_KEYWORDS if kw in text)

from schemas.posting import PostingInput, RedFlag

def extract_text_from_posting(posting: PostingInput) -> str:
    parts = [
        posting.title               or '',
        posting.company_profile     or '',
        posting.description         or '',
        posting.requirements        or '',
        posting.benefits            or ''
    ]
    return ' '.join(parts)

def get_cleaned_text(posting: PostingInput) -> str:
    raw = extract_text_from_posting(posting)
    return clean_text(raw)

def get_red_flags(posting: PostingInput) -> list[RedFlag]:
    raw_text = extract_text_from_posting(posting).lower()
    flags = []

    for keyword in RED_FLAG_KEYWORDS:
        if keyword in raw_text:
            # Classify severity based on keyword type
            if any(k in keyword for k in ['wire transfer', 'western union', 'send money', 'money order']):
                severity = 'high'
            elif any(k in keyword for k in ['whatsapp', 'telegram', 'pyramid', 'mlm']):
                severity = 'high'
            elif any(k in keyword for k in ['guaranteed', 'unlimited', 'passive income', 'commission only']):
                severity = 'medium'
            else:
                severity = 'low'

            flags.append(RedFlag(flag=keyword, severity=severity))

    # Structural red flags
    if not posting.has_company_logo:
        flags.append(RedFlag(flag="No company logo provided", severity="medium"))

    if not posting.company_profile:
        flags.append(RedFlag(flag="No company profile provided", severity="medium"))

    if not posting.requirements:
        flags.append(RedFlag(flag="No requirements listed", severity="low"))

    if not posting.salary_range:
        flags.append(RedFlag(flag="No salary range mentioned", severity="low"))

    if not posting.has_questions:
        flags.append(RedFlag(flag="No screening questions", severity="low"))

    return flags

def get_missing_fields_count(posting: PostingInput) -> int:
    fields = [
        posting.company_profile,
        posting.description,
        posting.requirements,
        posting.benefits,
        posting.salary_range,
        posting.industry,
        posting.location,
        posting.required_education,
        posting.required_experience
    ]
    return sum(1 for f in fields if not f)