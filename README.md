##Overview

This project visualizes global temperature anomalies from 1880 to the present using data from various temperature datasets. The primary objective is to present the temperature anomalies over time and highlight how they have changed globally. It includes interactive visualizations that allow users to explore the temperature anomalies by year and month.

## Instructions to Use

1. **Setting Up**: 
   - Clone this repository to your local machine.
   - Ensure you have Python installed along with the required libraries.
   - Required libraries: `Plotly`, `Pandas`, `SQLite3`.
   - Install the necessary libraries using the following command:
     ```bash
     pip install plotly pandas sqlite3
     ```

2. **Running the Project**:
   - To generate the visualizations, first ensure that the SQLite database (`temperature_anomalies.db`) is set up by running the provided script.
   - Run the visualization scripts (found in the `scripts/` folder). Each script generates an interactive plot that can be opened in your browser.
     - **Heatmap**: Displays temperature anomalies across months and years.
     - **Line Plot**: Shows the temperature anomalies over time.
     - **Dropdown and Slider Interaction**: Allows users to filter data by specific years and months.

3. **Interacting with the Visualizations**:
   - **Heatmap**: Hover over cells to view specific year, month, and temperature anomaly details.
   - **Dropdown Menu**: Use the dropdown to select a specific month to filter the data.
   - **Year Range Slider**: Adjust the slider to dynamically filter data by specific years.

## Ethical Considerations

This project handles global temperature data, which is an essential and sensitive topic. We have taken care to ensure that the visualizations are accurate and clear. However, it's important to note that this project only visualizes temperature anomalies, and users are encouraged to interpret the results responsibly. 

Misinterpretation of temperature anomalies could lead to misunderstanding the severity or patterns of global climate change. Additionally, since this data can impact public and governmental climate decisions, careful attention is given to ensure the data's accuracy and proper representation.

## Data Sources

The data used in this project comes from the following sources:
- [NASA GISS Surface Temperature Analysis (GISTEMP)](https://data.giss.nasa.gov/gistemp/)
- The dataset includes monthly temperature anomalies for various regions of the world from 1880 to the present.

## Code References

- **Plotly**: Used for creating interactive visualizations. Documentation and examples from the official Plotly library were referred to when building the visualizations.
  - [Plotly Official Documentation](https://plotly.com/python/)
- **Pandas**: Utilized for data manipulation and processing.
  - [Pandas Documentation](https://pandas.pydata.org/docs/)
- **SQLite3**: Used to store and query temperature anomaly data.

Any external code references or libraries used are acknowledged within the code or in this README.

## License

This project is open-source and available under the [MIT License](LICENSE).
