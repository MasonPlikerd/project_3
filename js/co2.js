d3.csv("fossil_CO2_totals_by_country.csv").then(function(data) {
    console.log("Data loaded:", data); // Log the data to inspect its structure

    // Remove unnecessary columns and keep only relevant data
    const cleanedData = data.map(d => {
        return {
            Country: d.Country,
            // Create an object with year as keys and emissions as values
            ...Object.fromEntries(
                Object.entries(d).filter(([key]) => {
                    // Keep only year columns (D to BC)
                    const year = parseInt(key);
                    return !isNaN(year) && year >= 1970 && year <= 2021;
                })
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

        console.log(`Selected Country: ${selectedCountry}, Year: ${selectedYear}, Emissions Value: ${emissionsValue}`); // Debugging output

        // Calculate min and max emissions for the selected country
        const countryEmissions = Object.entries(filteredData)
            .filter(([key]) => key !== 'Country')
            .map(([key, value]) => +value)
            .filter(value => !isNaN(value));

        const countryMinEmissions = Math.min(...countryEmissions);
        const countryMaxEmissions = Math.max(...countryEmissions);

        console.log(`Country Minimum emissions: ${countryMinEmissions}`);
        console.log(`Country Maximum emissions: ${countryMaxEmissions}`);

        // Create a color scale using country min and max
        const colorScale = d3.scaleLinear()
            .domain([countryMinEmissions, countryMaxEmissions]) // Input domain
            .range(["lightblue", "darkred"]); // Output range of colors

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
            colorscale: colorScale.range(), // Use the country-specific color scale
            colorbar: {
                title: `Emissions (${unit})`
            },
            zmin: countryMinEmissions, // Set min for color scale
            zmax: countryMaxEmissions  // Set max for color scale
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

    // Add event listeners to dropdowns to call updateMap when selections change
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
});
