import pandas as pd
import streamlit as st
from typing import Literal

import tabs.menu
import tabs.recommendation
import tabs.recipe

# Constants
PAGE_TITLE = "Southern Glazer's Brand Explorer"
LOGO_PATH = 'images/logo.png'
MAIN_IMAGE_PATH = 'images/wines.jpg'
DATA_PATH = 'data/products.csv'

# Configure Streamlit page
st.set_page_config(
    page_title=PAGE_TITLE,
    layout="wide",
    initial_sidebar_state="expanded"
)

def render_header():
    """Display the application header with logo and title."""
    logo_col, title_col = st.columns([0.2, 2])
    logo_col.image(LOGO_PATH, width=100)
    title_col.markdown(
        f"<h1 style='font-size: 50px; color: red;'>{PAGE_TITLE}</h1>",
        unsafe_allow_html=True
    )

def render_main_image():
    """Display the main image and subtitle."""
    st.image(MAIN_IMAGE_PATH, caption="A variety of wines", use_column_width=True)
    st.markdown(
        "<h1 style='font-size: 45px; color: red; text-align: center;'>List of Recommended Alcohols</h1>",
        unsafe_allow_html=True
    )

def get_selected_page() -> Literal["Menu Search", "Further Wine Rec", "Recipe Creator"]:
    """Provide a sidebar for page selection."""
    st.sidebar.header("Navigation")
    return st.sidebar.radio(
        "Select a Page",
        options=["Menu Search", "Further Wine Rec", "Recipe Creator"]
    )

def main():
    render_header()
    render_main_image()
    
    selected_page = get_selected_page()
    
    # Load data lazily
    df = pd.read_csv(DATA_PATH, index_col=None)
    
    # Route to the appropriate page
    if selected_page == "Menu Search":
        tabs.menu.main()
    elif selected_page == "Further Wine Rec":
        tabs.recommendation.main()
    elif selected_page == "Recipe Creator":
        tabs.recipe.chatbot_page()

if __name__ == "__main__":
    main()