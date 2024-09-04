import pandas as pd
import streamlit as st
import random

# Set the page configuration
st.set_page_config(
    page_title="Southern Glazers Brand Explorer",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Create columns for side-by-side layout
col1, col2 = st.columns([0.2, 2])

with col1:
    st.image('images/logo.png', width=100)

with col2:
    st.markdown(
        """
        <h1 style='font-size: 50px; color: red;'>Southern Glazer's Wine & Spirits Brand Explorer</h1>
        """,
        unsafe_allow_html=True
    )

st.image('images/wines.jpg', caption="A variety of wines", use_column_width=True)

st.markdown(
    """
    <h1 style='font-size: 45px; color: red; text-align: center;'>List of Recommended Alcohols</h1>
    """,
    unsafe_allow_html=True
)

df = pd.read_csv('data/products.txt', delimiter='|', index_col=None)

# Step 1: Brand selection
st.sidebar.header("Select Pages")
page = st.sidebar.radio("Select Page", options=["Menu Search", "Recipe Creator"])
st.sidebar.form("Insert a drink name for cocktail recipe")

if page == "Recipe Creator":
    # Initialize chat history in the sidebar
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []

    # Sidebar form for inserting a drink name
    with st.sidebar.form("insert_drink_form"):
        drink_name = st.text_input("Insert a drink name for cocktail recipe")
        submit_button = st.form_submit_button("Submit")
        
        if submit_button:
            st.sidebar.write(f"Drink name submitted: {drink_name}")

    # Sidebar chat interface
    st.sidebar.header("Chat Interface")

    # Input and submit button
    user_input = st.sidebar.text_input("Type your message:")
    if st.sidebar.button("Send"):
        if user_input:
            st.session_state.chat_history.append(f"You: {user_input}")
            # Simulate a response (replace with actual logic as needed)
            st.session_state.chat_history.append(f"Bot: Here's a response to '{user_input}'")

    # Display chat history in the sidebar
    for message in st.session_state.chat_history:
        st.sidebar.write(message)

st.header("Step 1: Select Brand(s)")
brand_options = df['corp_item_brand_name'].unique()
selected_brands = st.multiselect("Select Brand(s)", options=brand_options, default=[])

# If no brand is selected, display a message and stop execution
if not selected_brands:
    st.warning("Please select at least one brand to continue.")
    st.stop()

# Display the custom header after brand selection
st.header(f"Let's play the {', '.join(selected_brands).lower()} game")

# Step 2: Balloon Pop Game
st.header("Step 2: Pop a Balloon to Select a Flavor!")

# Filtered DataFrame for selected brands
filtered_df = df[df['corp_item_brand_name'].isin(selected_brands)]
flavors = filtered_df['flavor'].dropna().unique()

# Shuffle flavors for random balloon placement
flavors_shuffled = random.sample(list(flavors), len(flavors))

# Initialize the session state for the popped flavor
if "popped_flavor" not in st.session_state:
    st.session_state.popped_flavor = None

# Create balloons as buttons
cols = st.columns(5)  # Adjust the number of columns based on the number of balloons you want in a row

for idx, flavor in enumerate(flavors_shuffled):
    if cols[idx % 5].button(f"🎈 Balloon {idx+1}"):
        st.session_state.popped_flavor = flavor

# Show the result after a balloon is popped
if st.session_state.popped_flavor:
    st.success(f"🎉 You popped a balloon and found the flavor: {st.session_state.popped_flavor}")

# Step 3: Submit button to filter based on the popped flavor
if st.button("Submit"):
    st.header(F"Here's your customize recommendations")
    if st.session_state.popped_flavor:
        # Apply flavor filter and other brand filters
        filtered_df = filtered_df[filtered_df['flavor'] == st.session_state.popped_flavor]

        if filtered_df.empty:
            st.write("No results found. Please adjust your filters.")
        else:
            def create_blocks(filtered_df, num_columns=3, block_height=500, margin_bottom=15):
                total_rows = len(filtered_df)
                num_rows = (total_rows + num_columns - 1) // num_columns

                for i in range(num_rows):
                    cols = st.columns(num_columns)
                    for j, col in enumerate(cols):
                        idx = i * num_columns + j
                        if idx < total_rows:
                            row = filtered_df.iloc[idx]
                            with col:
                                st.markdown(f"""
                                <div style="border: 2px solid red; border-radius: 10px; padding: 15px; background-color: black; color: white; box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; justify-content: space-between; height: {block_height}px; width: 100%; margin-bottom: {margin_bottom}px;">
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

            create_blocks(filtered_df, num_columns=3, block_height=500, margin_bottom=15)
    else:
        st.warning("Please pop a balloon to select a flavor first.")
