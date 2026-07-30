import pdfplumber
import re


def verify_document(file_path):

    text = ""

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    result = {
        "email": False,
        "phone": False,
        "aadhaar": False,
        "pan": False,
        "credit_card": False,
        "risk": "Low"
    }

    # Email
    if re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text):
        result["email"] = True

    # Phone Number
    if re.search(r"\b[6-9]\d{9}\b", text):
        result["phone"] = True

    # Aadhaar
    if re.search(r"\b\d{4}\s\d{4}\s\d{4}\b", text):
        result["aadhaar"] = True

    # PAN
    if re.search(r"\b[A-Z]{5}[0-9]{4}[A-Z]\b", text):
        result["pan"] = True

    # Credit Card
    if re.search(r"\b(?:\d[ -]*?){13,16}\b", text):
        result["credit_card"] = True

    score = sum([
        result["email"],
        result["phone"],
        result["aadhaar"],
        result["pan"],
        result["credit_card"]
    ])

    if score >= 4:
        result["risk"] = "High"
    elif score >= 2:
        result["risk"] = "Medium"
    print(text)

    return result