// Load the CSV data
d3.csv("fossil_CO2_totals_by_country.csv").then(function(data) {
    console.log("Data loaded:", data); // Log the data to inspect its structure

    // Remove unnecessary columns and keep only relevant data
    const cleanedData = data.map(d => {
        return {
            Country: d.Country,
            ...Object.fromEntries(
                Object.entries(d).filter(([key]) => !['substance', 'EDGAR code'].includes(key))
            )
        };
    });

    // Get unique countries and years
    const countries = [...new Set(cleanedData.map(d => d.Country))];
    const years = Object.keys(cleanedData[0]).filter(key => key !== 'Country');

    // Populate the country dropdown
    const countryDropdown = d3.select("#countryDropdown");
    countries.forEach(country => {
        countryDropdown.append("option").text(country).attr("value", country);
    });

    // Populate the year dropdown
    const yearDropdown = d3.select("#yearDropdown");
    years.forEach(year => {
        yearDropdown.append("option").text(year).attr("value", year);
    });

    // Function to update the map based on selected country and year
    function updateMap(selectedCountry, selectedYear) {
        const filteredData = cleanedData.find(d => d.Country === selectedCountry); // Find the data for the selected country
        const emissionsValue = filteredData ? +filteredData[selectedYear] : 0; // Get the emissions value for the selected year

        let unit;
        if (selectedYear === 'Change from 1970/2021') {
            unit = 'Percent Change';
        } else {
            unit = 'Metric Tons per Year'; // Default case, you can customize this
        }

        const trace = {
            type: 'choropleth',
            locations: [selectedCountry],
            locationmode: 'country names',
            z: [emissionsValue], // This is the data value that will be mapped to the color scale
            colorscale: [
                [0, 'green'],   // Minimum value color
                [0.5, 'yellow'], // Midpoint color
                [1, 'red']      // Maximum value color
            ],
            colorbar: {
                title: `Emissions (${unit})`
            }
        };

        const layout = {
            title: `Fossil CO2 Emissions in ${selectedCountry} for ${selectedYear}`,
            geo: {
                showframe: false,
                projection: {
                    type: 'mercator'
                }
            }
        };

        Plotly.newPlot('map', [trace], layout);
    }

    // Event listeners for dropdown changes
    countryDropdown.on("change", function() {
        const selectedCountry = d3.select(this).property("value");
        const selectedYear = yearDropdown.property("value");
        updateMap(selectedCountry, selectedYear);
    });

    yearDropdown.on("change", function() {
        const selectedCountry = countryDropdown.property("value");
        const selectedYear = d3.select(this).property("value");
        updateMap(selectedCountry, selectedYear);
    });

    // Initial map display with default values
    const defaultCountry = countries[0]; // Set the default country
    const defaultYear = years[0]; // Set the default year
    updateMap(defaultCountry, defaultYear); // Update the map with default values
}).catch(function(error) {
    console.error("Error loading the CSV file:", error);
    alert("Failed to load the CSV file. Check the console for more details.");
});
