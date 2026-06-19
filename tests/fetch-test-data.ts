import fs from 'fs';
import path from 'path';

const portalUrl = 'https://auportal-dev.geoanalytics.group/';

async function fetchDynamicTestData() {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(portalUrl+"getKnownLayers.do");
    const data = await response.json();

    const outputPath = path.resolve(__dirname, './dynamicData.json');
    
    // Write data to a local file for synchronous test consumption
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Dynamic test data successfully downloaded.');
  } catch (error) {
    console.error('❌ Failed to fetch dynamic test data:', error);
    process.exit(1);
  }
}

fetchDynamicTestData();