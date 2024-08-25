from openai import OpenAI
import pandas as pd
# from dotenv import load_dotenv
import streamlit as st

openai_api_key = st.secrets['OPENAI_KEY']
model = "gpt-3.5-turbo-0125"

client = OpenAI(
    api_key = openai_api_key
#   api_key=os.environ.get("OPENAI_API_KEY")    
)

def return_chatgpt_review(input, recipe):
    instruction = F"Create a recipe for this item: {recipe}"

    chat_completion = client.chat.completions.create(
        model=model,
        max_tokens=200,
        temperature=0,
        messages=[
            {"role": "system", "content": instruction},
            {"role": "user", "content": input},
        ],
    )
    return chat_completion.choices[0].message.content