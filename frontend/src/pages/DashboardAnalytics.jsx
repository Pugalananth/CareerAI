import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip

} from "recharts";

const data=[

{
career:"DS",
score:92
},

{
career:"ML",
score:80
},

{
career:"AI",
score:75
}

];

function DashboardAnalytics(){

return(

<div>

<h1>

Career Analytics

</h1>

<BarChart

width={500}

height={300}

data={data}

>

<XAxis dataKey="career"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="score"/>

</BarChart>

</div>

);

}

export default DashboardAnalytics;