export async function getFromJSON(path, fields, id = null) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter objects to keep only specified fields
        const filteredData = data.map((obj) => {
            const filteredObj = {};
            fields.forEach((field) => {
                if (obj.hasOwnProperty(field)) {
                    filteredObj[field] = obj[field];
                }
            });
            return filteredObj;
        });

        // If id is provided, return single matching object
        if (id !== null) {
            return filteredData.find((obj) => obj.id === id) || null;
        }

        return filteredData;
    } catch (error) {
        console.error("Error fetching or processing JSON:", error);
        throw error;
    }
}

// Usage examples:
// Get all records
// const results = await getFromJSON('../DEMO_DATA/CREDENTIALS.json', ['id', 'username']);
// Get single record by id
// const result = await getFromJSON('../DEMO_DATA/CREDENTIALS.json', ['id', 'username'], 1001);
