import streamlit as st
import pandas as pd
import random

def display_menu(df):
    st.header("Step 1: Select Brand(s)")
    brand_options = df['corp_item_brand_name'].unique()
    selected_brands = st.multiselect("Select Brand(s)", options=brand_options, default=[])

    # If no brand is selected, display a message and stop execution
    if not selected_brands:
        st.warning("Please select at least one brand to continue.")
        st.stop()

    # Display the custom header after brand selection
    st.header(f"How do you like your{', '.join(selected_brands).lower()} ?")

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
                                            <p><strong>Flavor:</strong> {row['flavor']}</p>
                                            <p><strong>Tasting Notes:</strong> {row['pim_tasting_notes'] if pd.notna(row['pim_tasting_notes']) else 'N/A'}</p>
                                        </div>
                                    </div>
                                    """, unsafe_allow_html=True)

                create_blocks(filtered_df, num_columns=3, block_height=500, margin_bottom=15)
        else:
            st.warning("Please pop a balloon to select a flavor first.")