import fs from 'fs-extra'
import ImageCharts from 'image-charts';

// const width = 400; //px
// const height = 400; //px
// const canvasRenderService = new CanvasRenderService(width, height);
const covidFile = "./covid.json"
let activeCovidData: CovidStatsObject
interface CovidStatsObject {
    "lastCheck": string;
    "data": {
        [key: string]: {
            "Fort Smith": string;
            "Hay River": string;
            "Yellowknife": string;
        }
    };
}

// interface Rec {
//         [key: string]: {
//             [key: string]: {
//                 "Fort Smith": string;
//                 "Hay River": string;
//                 "Yellowknife": string;
//             }
//         }
//     }



try {
    activeCovidData = JSON.parse(fs.readFileSync(covidFile, 'utf-8'))
} catch (error) {
    activeCovidData = {
        "lastCheck": new Date().toISOString(),
        data: {}
    };
}


export const doMarkdown = async () => {


    try {
        console.log("converting data");

        console.log(activeCovidData);
        // const data:Rec = {}
        // const dates:Rec = {}
        // const names:Rec = {}
        // const data:Rec = {}
        // for (const rec of Object.entries(activeCovidData.data)) {
        //     console.log(rec);
        //     const dateString = rec[0]
        //     data[dateString] = rec[1]
        // }

    } finally {
        const pie = new ImageCharts().cht('p').chd('a:2.5,5,8.3').chs('100x100');

//        pie.toFile('/path/to/chart.png'); // Promise<()>


        console.log("we are done here....",pie);
    }




}




doMarkdown();