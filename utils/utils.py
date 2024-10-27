import streamlit as st

# Constants
PAGE_TITLE = "Southern Glazer's Brand Explorer"
LOGO_PATH = 'images/logo.png'
MAIN_IMAGE_PATH = 'images/wines.jpg'
DATA_PATH = 'data/products.csv'

def render_header():
    """Display the application header with logo and title."""
    logo_col, title_col = st.columns([0.2, 1])
    logo_col.image(LOGO_PATH, width=100)
    title_col.markdown(
        f"<h1 style='font-size: 50px; color: red;'>{PAGE_TITLE}</h1>",
        unsafe_allow_html=True
    )

def render_main_image():
    """Display the main image and subtitle."""
    st.image(MAIN_IMAGE_PATH, caption="A variety of wines", use_column_width=True)