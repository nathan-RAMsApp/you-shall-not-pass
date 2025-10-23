/*This module provides a function to fetch and filter JSON data similar to SQL queries. Purely to be used while testing a front end without the backend implemented yet.*/

export async function getFromJSON(
    path,
    fields,
    searchTerm = null,
    searchField = null
) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // If search parameters are provided, find matching object first
        let filteredData = data;
        if (searchTerm !== null && searchField !== null) {
            const matchingObject = data.find(
                (obj) => obj[searchField] === searchTerm
            );
            filteredData = matchingObject ? [matchingObject] : [];
        }

        // Then filter objects to keep only specified fields
        const result = filteredData.map((obj) => {
            const filteredObj = {};
            fields.forEach((field) => {
                if (obj.hasOwnProperty(field)) {
                    filteredObj[field] = obj[field];
                }
            });
            return filteredObj;
        });

        // Return single object or array based on search parameters
        return searchTerm !== null && searchField !== null
            ? result[0] || null
            : result;
    } catch (error) {
        console.error("Error fetching or processing JSON:", error);
        throw error;
    }
}

// Usage examples:
// Get all records
// const results = await getFromJSON('../DEMO_DATA/CREDENTIALS.json', ['id', 'username']);
// Get single record by search
// const result = await getFromJSON('../DEMO_DATA/CREDENTIALS.json', ['id', 'username'], 1001, 'id');
// const result = await getFromJSON('../DEMO_DATA/CREDENTIALS.json', ['id', 'username'], 'john_doe', 'username');
