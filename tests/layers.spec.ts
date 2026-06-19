import { test, expect, Page } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import path from 'path';
import knownLayers from "./dynamicData.json";
import pixelmatch from 'pixelmatch';

export default defineConfig({
  timeout: 50000, // Stops any test that takes longer than 30 seconds
  expect: {
    timeout: 10000, // Stops any assertion that takes longer than 5 seconds
  },
});

const portalUrl = 'https://auportal-dev.geoanalytics.group/';
const fs = require('fs');
const PNG = require('pngjs').PNG;

/*
(async (page,request) => {
  console.log("[TEST]iterate all known layers...");
})();
*/
//test('iterate all known layers', async ({ page, request }) => {
console.log("[TEST]iterate all known layers...");
//console.log("[TEST]open AuScope portal...")


/*
// Perform a POST request
const getResponse = await request.get(portalUrl + 'api/getKnownLayers.do', {
  headers: {
    'Content-Type': 'application/json'
  }
});
// Check the response status code - expecting 201 if the resource creation is successful
expect(getResponse.status()).toBe(200);
const knownLayers = await getResponse.json();
*/
//console.log("[TEST] " + knownLayers.data.length + " layers loaded");
// TODO: sort by group, then iterate
//for (var i = 270; i < knownLayers.data.length; i++) {

//let knownLayers;
let noKnownLayers: number = 0;
//let layers;
let portalLoaded = false;
/*
interface Layer { name: any; group: any; }
let knownLayers: Layer[] = [];

async function dynamicData() {
  console.log("[TEST]dynamicData()");
  //const dataPath = path.resolve(__dirname, './dynamicData.json');
  const x = './dynamicData.json';
  knownLayers = await import('./dynamicData.json');
  noKnownLayers = knownLayers.length;
  console.log("[TEST] " + noKnownLayers + " layers loaded");
  //console.log("[TEST]knownLayers = ",knownLayers);
  var i = 0;
  knownLayers.forEach((layer) => {
    let layerName = layer.name;
    let layerGroup = layer.group;
    console.log("[TEST]" + i + ": " + layerGroup + " - " + layerName);
    i++;
  });
}
*/
//dynamicData();


// This runs separately before EVERY single test block
test.beforeEach(async ({ page }) => {
  //console.log("[TEST}beforeEach(start)");
  //if (portalLoaded) { return; }
  const p1 = await page.goto(portalUrl);
  await page.waitForTimeout(1 * 1000); // 5s
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AuScope Discovery Portal/);
  //console.log("[TEST}Portal loaded...");
  portalLoaded = true;
});
/*
test.beforeAll(async () => {
  console.log("[TEST}beforeAll(start)");
  // Perform a POST request
  if (noKnownLayers > 0) { return; }
  const getResponse = await fetch(portalUrl + 'api/getKnownLayers.do');
  let response = await getResponse.json();
  //layers = response.data;
  //noKnownLayers = layers.length;
  console.log("[TEST]beforeAll() " + noKnownLayers + " layers loaded");
  //let a: Layer[] = [];
  response.data.forEach((layer) => {
    const d = { name: layer.name, group: layer.group };
    knownLayers.push(d);
  });
  //console.log(a);
  const dataPath = path.resolve(__dirname, './dynamicData.json');
  console.log("[TEST]beforeAll().dataPath = ", dataPath);
  fs.writeFileSync(dataPath, JSON.stringify(knownLayers, null, 2), 'utf-8');
});
*/

/*
// Define a file-scoped page variable
let page: Page;

test.beforeAll(async ({ browser }) => {
  // Manually spin up a new page context using the browser fixture
  page = await browser.newPage(); 
  await page.goto(portalUrl);
});
*/


test.describe('API-Driven Tests', () => {

  var i = 0;
  //let layers2 = [{ group: "chris", name: "test1" }, { group: "tim", name: "test2" }];
  //layers.forEach((layer) => {
  knownLayers.forEach((layer) => {
    //for (const layer of knownLayers) {
    //for (var i = 0; i < noKnownLayers; i++) {
    //for (var i = 120; i < 126; i++) {
    //for (var i = 125; i < 126; i++) {
    //for (var i = 14; i < 17; i++) {
    //for (var i = 15; i < 17; i++) {

    //var layerGroup = "";
    //var layerName = "";
    //var layer = knownLayers.data[i];
    //layerGroup = knownLayers.data[i].group; //layer.group;
    //layerName = knownLayers.data[i].name;
    //layerGroup = layer.group; //layer.group;
    let layerName = layer.name;
    let layerGroup = layer.group;
    //let layerGroup = knownLayers[i].group; //layer.group;
    //let layerName = knownLayers[i].name;
    //console.log("[TEST]" + i + ": " + layerGroup + " - " + layerName);
    let testName = "test " + i + ": select " + layerGroup + " - " + layerName;
    i++;
    //if ((i < 14) || (i > 17)) { return; }
    test(testName, async ({ page }) => {
      test.setTimeout(9000000); // Sets the limit to 60 seconds for this test only  

      await page.getByRole('button', { name: '3D' }).click();
      await page.getByRole('button', { name: '2D' }).click();
      await page.getByRole('button', { name: 'Reset map view' }).click();
      await page.getByRole('combobox', { name: 'Enter search term here...' }).click();
      await page.waitForTimeout(5 * 1000); // 5s

      //i = i + 1;

      await page.getByRole('button', { name: 'Reset map view' }).click();
      await page.getByRole('combobox', { name: 'Enter search term here...' }).click();
      await page.waitForTimeout(5 * 1000); // 5s
      // load an initial baseline image for fcomparion with future screenshots
      var imgBuffer0;
      //console.log("[TEST]capture initial screenshot...");
      const boxBaseline = await page.locator('.cesium-widget > canvas').boundingBox();
      //console.log("[TEST]boxBaseline = ", boxBaseline);
      if (boxBaseline) {
        imgBuffer0 = await page.screenshot({ clip: boxBaseline });
      }

      //console.log("[TEST]Browse to Group...")
      //await expect(page).toHaveTitle(/AuScope Discovery Portal/);
      await page.waitForTimeout(3 * 1000); // 5s
      await page.getByRole('button', { name: 'Browse featured layers Browse' }).click();
      await page.waitForTimeout(1 * 1000); // 5s
      //await page.getByText('Featured Layer Groups');
      //if (page.getByText('Featured Layer Groups')) {
      //  await page.getByRole('button', { name: 'Browse featured layers Browse' }).click();
      //}
      await page.locator('a').filter({ hasText: layerGroup }).first().selectText();
      await page.waitForTimeout(1 * 1000); // 5s
      await page.locator('a').filter({ hasText: layerGroup }).first().click();
      await page.waitForTimeout(1 * 1000); // 5s
      //console.log("[TEST]Try to add Layer...");
      var layerAdded: boolean = true;
      //await page.locator('a').filter({ hasText: layerName }).selectText();
      const layerElement = page.locator('a').filter({ has: page.getByText(layerName, { exact: true }) });
      const layerCount = await layerElement.count();
      if (layerCount > 1) {
        console.log("[TEST]found " + layerCount + " layers; will use the first!");
      }
      await page.locator('a').filter({ has: page.getByText(layerName, { exact: true }) }).first().selectText();
      await page.waitForTimeout(1 * 1000);
      //if (!page.locator("a").filter({ hasNotText: "Add " + layerName })) {
      const isLayerOk = await page.locator("a").filter({ has: page.getByText("Add " + layerName, { exact: true }) }).getByRole('button').first().isVisible();
      //const isLayerOk = await page.locator("a").filter({ hasText: "Add " + layerName }).getByRole('button').isVisible();
      if (isLayerOk) {
        await page.locator("a").filter({ hasText: "Add " + layerName }).getByRole('button').first().click();
        await page.waitForTimeout(3 * 1000); // 5s
        if ((layerGroup.startsWith("Boreholes")) && (layerName.startsWith("National Virtual Core Library V-2.0"))) {
          await nvclLayer(page, imgBuffer0);
        }
        await page.locator('div').filter({ hasText: layerName }).getByRole('button', { name: 'Remove layer' }).click();
      } else {
        console.log("[TEST]Layer not able to be added...");
        await page.waitForTimeout(3 * 1000);
        await page.getByRole('button', { name: 'Browse featured layers Browse' }).click();
        layerAdded = false;
      }
      /*
      await page.waitForTimeout(1 * 1000); // 5s
      if (layerAdded) {
        console.log("[TEST]remove layer");
        await page.locator('div').filter({ hasText: layerName }).getByRole('button', { name: 'Remove layer' }).click();
      }
      */
    });
  });


  async function nvclLayer(page: Page, imgBuffer0) {

    console.log("[TEST]NVCL Borehole Layer...")

    await page.locator('fieldset').filter({ hasText: 'Optional FiltersName Identifier Length (greater than) Length (less than)' }).locator('select').selectOption('0: Object');
    await page.locator('#card-tab-content').first().locator('input[type="text"]').click();
    await page.locator('#card-tab-content').first().locator('input[type="text"]').fill('MSDP04');
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByText('Apply Filter').first().click();
    await page.getByRole('button', { name: 'Close' }).click();
    //console.log("[TEST]apply filter...")
    await page.waitForTimeout(1 * 1000); // 5s

    //console.log("[TEST]capture screenshot...")
    let imgBuffer1;
    var boxFeatures = await page.locator('.cesium-widget > canvas').boundingBox();
    //console.log("[TEST]boxFeatures = ", boxFeatures);
    if (boxFeatures) {
      imgBuffer1 = await page.screenshot({ clip: boxFeatures });
    }
    //console.log("[TEST]capture layer screenshot...")

    // Parse the PNG buffers
    const img0 = PNG.sync.read(imgBuffer0);
    const img1 = PNG.sync.read(imgBuffer1);
    const { width, height } = img0;
    //const newWidth = width - 50; // remove the righthand edge,s o we don't pick up highlighted map tools
    const diff = new PNG({ width, height });

    // Run pixelmatch to find differences
    // numDiffPixels will count how many pixels changed
    const numDiffPixels = pixelmatch(
      img0.data,
      img1.data,
      diff.data,
      width,
      height,
      { threshold: 0.2 } // Adjust sensitivity (0 to 1)
    );
    //console.log("[TEST]numDiffPixels = ", numDiffPixels);
    //console.log("[TEST]width = ", width);
    //console.log("[TEST]height = ", height);
    //var boxDiff = diff.data.boundingBox();
    //console.log("[TEST]boxDiff = ",boxDiff);

    if (numDiffPixels === 0) {
      console.log('[TEST]No changes detected.');
      //return null;
    }

    // Loop through diff buffer to find the bounding box of changes
    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;

        //if (x < (width-50)) { // skip the rightside cesium toolbar
        // Pixelmatch colors differences in bright red: RGBA (255, 0, 0, 255)
        const isRed = diff.data[idx] === 255 && diff.data[idx + 1] === 0 && diff.data[idx + 2] === 0;

        if (isRed) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        //}
      }
    }


    // Save the diff image to disk to visually verify
    fs.writeFileSync('diff.png', PNG.sync.write(diff));
    fs.writeFileSync('img0.png', PNG.sync.write(img0));
    fs.writeFileSync('img1.png', PNG.sync.write(img1));

    // Return the bounding box coordinates
    const changeCoordinates = {
      topLeft: { x: minX, y: minY },
      bottomRight: { x: maxX, y: maxY },
      width: maxX - minX,
      height: maxY - minY
    };
    console.log('[TEST]Change Coordinates:', changeCoordinates);

    await page.waitForTimeout(1 * 1000); // 5s
    const box = await page.locator('.cesium-widget > canvas').boundingBox();
    var centreX;
    var centreY;
    if (box) {
      centreX = box.x + box.width / 2;
      centreY = box.y + box.height / 2;
    }
    var featureX = minX + ((maxX - minX) / 2);
    var featureY = minY + ((maxY - minY) / 2);

    await page.locator('.cesium-widget > canvas').click({
      position: {
        x: featureX,
        y: featureY
      }
    });

    /*
    // Add a 10px red dot at X=200, Y=300
    await page.evaluate(({ x, y }) => {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = 'red';
      dot.style.zIndex = '999999'; // Ensure it stays on top
      const e = document.getElementsByClassName("cesium-widget");
      e[0].appendChild(dot);
      //document.getElementsByName(".cesium-widget").item[0].appendChild(dot);
    }, { x: featureX, y: featureY+50 });
    //console.log("[TEST]e[0] = ",e[0]);
    */
    const position = {
      x: featureX,
      y: featureY
    }
    console.log('[TEST]Click Coordinates:', position);
    await page.waitForTimeout(2 * 1000); // 5s

    // Expect a title "to contain" a substring.
    const isFeatureInfo = await page.getByRole("heading", { "name": "Feature Information" }).isVisible();
    if (isFeatureInfo) {
      //console.log("[TEST]Dialog(Feature Information).open");
      await page.waitForTimeout(1 * 1000); // 5s
      var coords = { featureX: featureX, featureY: featureY, centreX: centreX, centreY: centreY };
      if (!(await page.getByText("It looks like there aren't any results where you have clicked.").isVisible())) {
        await featureInfo(page);
      } else {
        await featureNotFound(page, coords);
      }
    } else {
      console.log("[TEST]Dialog(Feature Information).closed");
    }
  }


  async function featureNotFound(page: Page, coords: { featureX: any; featureY: any; centreX: any; centreY: any; },) {
    console.log("[TEST]featureNotFound().Dialog(Feature Information).open(features not found)");
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(5 * 1000); // 5s
    //console.log("[TEST]featureNotFound().coords = ", coords);
    const target = page.locator('.cesium-widget > canvas');
    await page.locator('.cesium-widget > canvas').dragTo(target, {
      sourcePosition: { x: coords.featureX, y: coords.featureY },
      targetPosition: { x: coords.centreX, y: coords.centreY },
    });
    await page.waitForTimeout(5 * 1000); // 5s
    await page.getByRole('button', { name: 'Zoom In' }).click();
    await page.waitForTimeout(5 * 1000); // 5s


    await page.getByRole('slider').fill('0');
    await page.waitForTimeout(3 * 1000); // 5s
    const boxBaseline = await page.locator('.cesium-widget > canvas').boundingBox();
    //console.log("[TEST]featureNotFound().boxBaseline = ", boxBaseline);
    let imgBuffer0;
    if (boxBaseline) {
      imgBuffer0 = await page.screenshot({ clip: boxBaseline });
    }
    await page.getByRole('slider').fill('100');
    await page.waitForTimeout(3 * 1000); // 5s
    var boxFeatures = await page.locator('.cesium-widget > canvas').boundingBox();
    //console.log("[TEST]boxFeatures = ", boxFeatures);
    let imgBuffer1;
    if (boxFeatures) {
      imgBuffer1 = await page.screenshot({ clip: boxFeatures });
    }

    const img0_zoom = PNG.sync.read(imgBuffer0);
    const img1_zoom = PNG.sync.read(imgBuffer1);
    const { width, height } = img0_zoom;
    const diff_zoom = new PNG({ width, height });
    const numDiffPixels = pixelmatch(
      img0_zoom.data,
      img1_zoom.data,
      diff_zoom.data,
      width,
      height,
      { threshold: 0.2 } // Adjust sensitivity (0 to 1)
    );
    //console.log("[TEST]featureNotFound().numDiffPixels = ", numDiffPixels);


    if (numDiffPixels === 0) {
      console.log('[TEST]featureNotFound().No changes detected.');
      //return null;
    }

    // Loop through diff buffer to find the bounding box of changes
    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;

        //if (x < (width-50)) { // skip the rightside cesium toolbar
        // Pixelmatch colors differences in bright red: RGBA (255, 0, 0, 255)
        const isRed = diff_zoom.data[idx] === 255 && diff_zoom.data[idx + 1] === 0 && diff_zoom.data[idx + 2] === 0;

        if (isRed) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        //}
      }
    }

    // Save the diff image to disk to visually verify
    fs.writeFileSync('diff_zoom.png', PNG.sync.write(diff_zoom));
    fs.writeFileSync('img0_zoom.png', PNG.sync.write(img0_zoom));
    fs.writeFileSync('img1_zoom.png', PNG.sync.write(img1_zoom));

    // Return the bounding box coordinates
    const changeCoordinates = {
      topLeft: { x: minX, y: minY },
      bottomRight: { x: maxX, y: maxY },
      width: maxX - minX,
      height: maxY - minY
    };
    console.log('[TEST]featureNotFound().Change Coordinates:', changeCoordinates);

    await page.waitForTimeout(1 * 1000); // 5s
    const featureX = minX + ((maxX - minX) / 2);
    const featureY = minY + ((maxY - minY) / 2);

    const position = {
      x: featureX,
      y: featureY
    }
    console.log('[TEST]featureNotFound().Click Coordinates:', position);

    await page.locator('.cesium-widget > canvas').click({
      position: {
        x: coords.centreX, //featureX,
        y: coords.centreY //featureY
      }
    });
    await page.waitForTimeout(3 * 1000); // 5s


    const isFeatureInfo = await page.getByRole("heading", { "name": "Feature Information" }).isVisible();
    if (!isFeatureInfo) {
      console.log("[TEST]featureNotFound().Dialog(Feature Information).open(features not found - try two)");
      await page.getByRole('button', { name: 'Close' }).click();
      await page.waitForTimeout(3 * 1000); // 5s
      await page.getByTitle('Open active layers').click();
      await page.waitForTimeout(1 * 1000); // 5s
    } else {
      console.log("[TEST]featureNotFound().Dialog(Feature Information  found - try two)");
      await featureInfo(page);
      await page.waitForTimeout(3 * 1000); // 5s
      await page.getByTitle('Open active layers').click();
      await page.waitForTimeout(1 * 1000); // 5s
    }
  }


  async function featureInfo(page: Page) {
    console.log("[TEST]featureInfo().Dialog(Feature Information).open(features found)");
    await page.waitForTimeout(5 * 1000); // 5s
    await page.getByRole('button', { name: 'Image' }).click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('button', { name: 'Scalar' }).click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('row', { name: 'Grp1 uTSAS Definition' }).getByLabel('').check();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.locator('.ti-bar-chart-alt').click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByText('value').click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByText('scatter').click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForTimeout(1 * 1000); // 5s

    /*
    console.log("[TEST]Search for term...");
    //await page.getByRole('combobox', { name: 'Enter search term here...' }).click();
    //await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('combobox', { name: 'Enter search term here...' }).fill('SA geochronology');
    await expect(page.getByRole('button', { name: 'Search layers' })).toBeVisible();
    //await page.waitForTimeout(3 * 1000); // 5s
    await page.getByRole('button', { name: 'Search layers' }).click();
    //await page.waitForTimeout(1 * 1000); // 5s
    await expect(page.locator('#sa-field-observation-sites').getByRole('button', { name: 'info' })).toBeVisible();
    await page.locator('#sa-field-observation-sites').getByRole('button', { name: 'info' }).click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('link', { name: 'Department for Energy and' }).click();
    await page.waitForTimeout(1 * 1000); // 5s
    await page.getByText('Close')
    await page.waitForTimeout(1 * 1000); // 5s
    await expect(page.locator('div').filter({ hasText: /^Close$/ }).getByRole('button', { name: 'Close' })).toBeVisible();
    await page.locator('div').filter({ hasText: /^Close$/ }).getByRole('button', { name: 'Close' }).click();
    //await page.waitForTimeout(1 * 1000); // 5s
    await page.getByRole('button', { name: 'Hide results' }).click();
    //await page.waitForTimeout(1 * 1000); // 5s
    //await page.getByTitle('Open active layers').click();
    //await page.waitForTimeout(1 * 1000); // 5s
    */
  }
});
