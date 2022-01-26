import fs from 'fs-extra'
import { until, By,Builder, Capabilities } from 'selenium-webdriver'

const covidUrl = "https://nwt-covid.shinyapps.io/Testing-and-Cases/?lang=1"
const smithXpath = "/html/body/div[1]/div/div[1]/div[1]/div/div[3]/div[2]/div[2]/div/div/div/table/tbody/tr[3]/td[2]"
const hayRiverXpath = "/html/body/div[1]/div/div[1]/div[1]/div/div[3]/div[2]/div[2]/div/div/div/table/tbody/tr[4]/td[2]"
const yellowknifeXpath = "/html/body/div[1]/div/div[1]/div[1]/div/div[3]/div[2]/div[2]/div/div/div/table/tbody/tr[7]/td[2]"
const updateDateXpath = "/html/body/div[1]/div/div[1]/div[1]/div/div[6]/div/div/div/h6[3]"
const covidFile = "./covid.json"
let activeCovidData: CovidStatsObject
interface CovidStatsObject {
    [key: string]: {
        "Fort Smith": string;
        "Hay River": string;
        "Yellowknife": string;
    };
}
try {
    activeCovidData = JSON.parse(fs.readFileSync(covidFile, 'utf-8'))    
} catch (error) {
    activeCovidData = {};
}



export const getRemote = async () => {


    console.log("Web Scraping Covid site");
    const driver = await new Builder().withCapabilities(Capabilities.chrome()).build();

    try {
        console.log("loading web page");
        await driver.get(covidUrl);
        console.log("Waiting for trigger");
        await driver.wait(until.elementLocated(By.id('DataTables_Table_0_wrapper')), 90 * 1000);
        console.log("parsing document");
        const smith = await driver.findElement(By.xpath(smithXpath)).getText()
        const hayRiver = await driver.findElement(By.xpath(hayRiverXpath)).getText()
        const yellowknife = await driver.findElement(By.xpath(yellowknifeXpath)).getText()
        const updated = await (await driver.findElement(By.xpath(updateDateXpath)).getText()).split(' ')[1]
        const updateObject = {
            "Fort Smith": smith,
            "Hay River": hayRiver,
            "Yellowknife": yellowknife
        }
        activeCovidData[updated] = updateObject
        console.log(activeCovidData);
        const data = JSON.stringify(activeCovidData, null, 2);
        fs.writeFileSync(covidFile, data);
    } finally {
        await driver.quit();
    }




}


getRemote();