const axios = require('axios');

var years = new Array(2020 - 1990).join(',').split(',').map( (d, i) => i + 1991 );
var data = '', year;

async function run(count) {
	if( count >= 5 ) {
		data_format();
		return;
	}
	let url = `http://quotes.money.163.com/trade/lsjysj_zhishu_000001.html?year=${years[count]}&season=`;
	let res1 = await axios.get(url + '1'),
		res2 = await axios.get(url + '2'),
		res3 = await axios.get(url + '3'),
		res4 = await axios.get(url + '4');
	data += res1.data.match(/<tr class=''><td>.*?<\/table>/) ? res1.data.match(/<tr class=''><td>.*?<\/table>/)[0] : "";
	data += res2.data.match(/<tr class=''><td>.*?<\/table>/) ? res2.data.match(/<tr class=''><td>.*?<\/table>/)[0] : "";
	data += res3.data.match(/<tr class=''><td>.*?<\/table>/) ? res3.data.match(/<tr class=''><td>.*?<\/table>/)[0] : "";
	data += res4.data.match(/<tr class=''><td>.*?<\/table>/) ? res4.data.match(/<tr class=''><td>.*?<\/table>/)[0] : "";
	console.log(years[count]);
	count += 1;
	run(count);
}

run(0);

function data_format() {
	data = data.split(/<tr.*?>/).slice(1);
	data = data.map( d => d.split('<td>').slice(1) ).filter( d => d.length === 9 );
	year = data.map( d => parseFloat( d[0].slice(0, -5) ) );
	data = data.map( d => parseFloat( d[4].slice(0, -5).replace(',', '') ) );
	console.log(year);
	console.log(data);
}