export const calculateTokenGraphValues = (data:any) => {
    let graphData = [];
    let max = 0;
    let min = Infinity;
    for (let i=0;i<data.history.length;i++) {
        graphData.push(data.history[i].rate);
        if (data.history[i].rate > max) {
            max = data.history[i].rate;
        }

        if (data.history[i].rate < min) {
            min = data.history[i].rate;
        }
    }

    return {
        graphData: graphData,
        currentTokenRate: data.history[0].rate - data.rate,
        percentage: (data.history[0].rate - data.rate) / data.rate * 100,
        gradient: (100 - (min/max) * 100) + ((100 - (min/max) * 100) * 0.1)
    }
}