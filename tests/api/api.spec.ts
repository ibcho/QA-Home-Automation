import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

test.describe('API Tests - Grocery Store API', () => {
    test('Run Postman Collection', async () => {
        const collectionPath = 'postman_collection/Grocery Store API.postman_collection.json';
        
        try {
            // Run the Postman collection using newman
            const { stdout, stderr } = await execAsync(`npx newman run "${collectionPath}" --reporters cli --silent`);
            
            // Log the output for debugging
            console.log('Newman Output:', stdout);
            if (stderr) {
                console.log('Newman Errors:', stderr);
            }
            
            // Check if the collection ran successfully
            // Newman exits with code 0 on success, non-zero on failure
            expect(stdout).toBeTruthy();
            
            // You can add more specific assertions based on your collection's expected output
            // For example, check if specific test results are present
            expect(stdout).toContain('newman');
            
        } catch (error) {
            // If newman fails, the test will fail
            console.error('Newman execution failed:', error);
            throw error;
        }
    });

    test('API Health Check', async ({ request }) => {
        // Direct API test using Playwright's request API
        // This is an alternative to running the Postman collection
        const response = await request.get('https://simple-grocery-store-api.glitch.me/status');
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
    });

    test('Get Products API', async ({ request }) => {
        const response = await request.get('https://simple-grocery-store-api.glitch.me/products');
        
        expect(response.status()).toBe(200);
        
        const products = await response.json();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        
        // Verify product structure
        const firstProduct = products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
    });
}); 