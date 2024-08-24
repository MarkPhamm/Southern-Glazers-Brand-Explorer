import pandas as pd
import streamlit as st


# Set the page configuration
st.set_page_config(
    page_title="Full Screen App",  # Browser tab title
    layout="wide",                 # Use the full width of the page
    initial_sidebar_state="expanded"  # Start with the sidebar collapsed
)


# Create columns for side-by-side layout
col1, col2 = st.columns([0.2, 2])  # Adjust the ratio as needed

with col1:
    # Display the image
    st.image('images/logo.png', width=100)

with col2:
    # Use HTML to make the header larger and red
    st.markdown(
        """
        <h1 style='font-size: 60px; color: red;'>Southern Glazer's Wine & Spirits Brand Explorer</h1>
        """,
        unsafe_allow_html=True
    )

# Display the image with full width
st.image('images/wines.jpg', caption="A variety of wines", use_column_width=True)



# Use HTML to make the header larger, red, and centered
st.markdown(
    """
    <h1 style='font-size: 45px; color: red; text-align: center;'>List of Recommended Alcohols</h1>
    """,
    unsafe_allow_html=True
)

df = pd.read_csv('data\products.txt', delimiter='|', index_col=None)

# Sidebar filters
st.sidebar.header("Filter Options")

# Sidebar filters
st.sidebar.header("Filter Options")

# Text input for `item_desc`
item_desc_input = st.sidebar.text_input("Filter by Item Description", "")

# Text input for `pim_tasting_notes`
tasting_notes_input = st.sidebar.text_input("Filter by Tasting Notes", "")

# Filter by `corp_item_brand_name`
brand_options = df['corp_item_brand_name'].unique()
selected_brands = st.sidebar.multiselect("Select Brand(s)", options=brand_options, default=[])

# Filter by `pim_item_class_desc`
class_options = df['pim_item_class_desc'].unique()
selected_classes = st.sidebar.multiselect("Select Class(es)", options=class_options, default=[])

# Filter by `state`
state_options = df['state'].unique()
selected_states = st.sidebar.multiselect("Select State(s)", options=state_options, default=[])

# Filter by `flavor`
flavor_options = df['flavor'].unique()
selected_flavors = st.sidebar.multiselect("Select Flavor(s)", options=flavor_options, default=[])

# Apply filters to DataFrame
filtered_df = df[
    (df['item_desc'].str.contains(item_desc_input, case=False, na=False) if item_desc_input else True) &
    (df['pim_tasting_notes'].str.contains(tasting_notes_input, case=False, na=False) if tasting_notes_input else True) &
    (df['corp_item_brand_name'].isin(selected_brands) | (len(selected_brands) == 0)) &
    (df['pim_item_class_desc'].isin(selected_classes) | (len(selected_classes) == 0)) &
    (df['state'].isin(selected_states) | (len(selected_states) == 0)) &
    (df['flavor'].isin(selected_flavors) | (len(selected_flavors) == 0))
]

# If no filters are applied, show a random sample of 10 wines
if len(filtered_df) == len(df):
    filtered_df = df.sample(n=9, random_state=1)

st.text(len(df))
st.text(len(filtered_df))

# Create blocks using Streamlit's columns layout
num_columns = 3
total_rows = len(filtered_df)
num_rows = (total_rows + num_columns - 1) // num_columns  # Calculate number of rows needed

for i in range(num_rows):
    cols = st.columns(num_columns)  # Create a row with `num_columns` columns
    for j, col in enumerate(cols):
        idx = i * num_columns + j
        if idx < total_rows:
            row = filtered_df.iloc[idx]
            with col:
                st.markdown(f"""
                <div style="border: 2px solid red; border-radius: 10px; padding: 15px; background-color: black; color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: space-between; height: 400px; width: 100%;">
                    <h3 style="margin-top: 0; color: red; text-align: center; font-size: 24px;">{row['item_desc']}</h3>
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <p><strong>Brand Name:</strong> {row['corp_item_brand_name']}</p>
                        <p><strong>Class:</strong> {row['pim_item_class_desc']}</p>
                        <p><strong>Sub-Class:</strong> {row['pim_item_sub_class_desc']}</p>
                        <p><strong>State:</strong> {row['state']}</p>
                        <p><strong>Flavor:</strong> {row['flavor']}</p>
                        <p><strong>Tasting Notes:</strong> {row['pim_tasting_notes'] if pd.notna(row['pim_tasting_notes']) else 'N/A'}</p>
                    </div>
                </div>
                """, unsafe_allow_html=True)