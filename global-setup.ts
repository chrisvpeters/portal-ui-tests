import { FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const portalUrl = 'https://auportal-dev.geoanalytics.group/';

async function globalSetup(config: FullConfig) {
  console.log("[TEST]globalSetup(start)");
  const dataPath = path.resolve(__dirname, './tests/dynamicData.json');
  try {
    try {
      fs.unlinkSync(dataPath);
      console.log('[TEST]globalSetup().File deleted successfully.');
    } catch (error) {
      console.error('[TEST]globalSetup().Failed to delete file:', error);
    }
    interface Layer { name: any; group: any; }
    let knownLayers: Layer[] = [];
    // Replace with your actual API endpoint
    const fetchUrl = portalUrl + "api/getKnownLayers.do";
    //console.log("[TEST]globalSetup().fetchUrl = ", fetchUrl);
    const getResponse = await fetch(fetchUrl);
    //console.log("[TEST]globalSetup().getResponse = ", getResponse);
    const response = await getResponse.json();
    //console.log("[TEST]globalSetup().response.data = ", response.data);

    response.data.forEach((layer) => {
      const d = { name: layer.name, group: layer.group };
      knownLayers.push(d);
    });
    //console.log("[TEST]globalSetup().dataPath = ", dataPath);
    //console.log("[TEST]globalSetup().knownLayers = ", knownLayers);
    console.log("[TEST]globalSetup().knownLayers.length = ", knownLayers.length);
    fs.writeFileSync(dataPath, JSON.stringify(knownLayers, null, 2), 'utf-8');
    console.log('✅ [TEST]globalSetup().Dynamic test data successfully downloaded.');
  } catch (error) {
    console.error('❌ [TEST]globalSetup().Failed to fetch dynamic test data:', error);
    process.exit(1);
  }
}

export default globalSetup;