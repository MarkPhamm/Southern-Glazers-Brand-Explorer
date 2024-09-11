import streamlit as st
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
openai_api_key = os.getenv('OPENAI_KEY')

# Initialize OpenAI client
client = OpenAI(api_key=openai_api_key)

# Use the more cost-effective gpt-3.5-turbo model
model = "gpt-3.5-turbo"

def get_ai_response(messages):
    chat_completion = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=300,  # Reduced max tokens for cost efficiency
        temperature=0.7
    )
    return chat_completion.choices[0].message.content

# Streamlit page for the chatbot interaction
def chatbot_page():
    st.title("Wine ChatBot - Recipe Suggestions and More")
    
    # Initialize chat history in session state if it doesn't exist
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    
    # Display chat history
    for message in st.session_state.chat_history:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    # Get user input
    user_input = st.chat_input("What wine would you like to use, or do you have any questions?")
    
    if user_input:
        # Add user message to chat history
        st.session_state.chat_history.append({"role": "user", "content": user_input})
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(user_input)
        
        # Prepare messages for AI, including chat history
        messages = [
            {"role": "system", "content": "You are a knowledgeable wine enthusiast. Provide concise wine information, brief recipe suggestions, and answer questions about wines and cocktails."},
        ] + st.session_state.chat_history
        
        # Get AI response
        ai_response = get_ai_response(messages)
        
        # Add AI response to chat history
        st.session_state.chat_history.append({"role": "assistant", "content": ai_response})
        
        # Display AI response
        with st.chat_message("assistant"):
            st.markdown(ai_response)

    # Add a button to clear chat history
    if st.button("Clear Chat History"):
        st.session_state.chat_history = []
        st.experimental_rerun()