import React, { useEffect, useRef } from 'react'

const AQChart = ({chartData, isVisible}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if(chartData.length > 0 && canvasRef.current){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      //clear canvas
      ctx.clearRect(0,0,width,height);

      //chart parameters
      const margin = 100;
      const chartWidth = width -2 * margin;
      const chartHeight = height - 2 * margin;
      const maxAQI = 5;
      const minAQI = 1;
      const range = maxAQI - minAQI || 1;


      //Draw background
      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0,0,width,height);

      //Draw grid lines
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;

      for(let i =0;i<= 4; i++){
        const y = margin + (1 * chartHeight/ 4);
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
      }

      //Draw chart line
      ctx.strokeStyle = '#4299e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      chartData.forEach((point,idx) => {
        const x = margin + (idx * chartWidth / (chartData.length - 1));
        const y = margin + chartHeight - ((point.aqi - minAQI) / range) * chartHeight;
        if(idx === 0){
          ctx.moveTo(x,y);
        }else{
          ctx.lineTo(x,y);
        }
      });
      ctx.stroke();

      //Draw data points
      ctx.fillStyle = '#4299e1';
      chartData.forEach((point,idx) => {
        const x = margin + (idx * chartWidth / (chartData.length - 1));
        const y = margin + chartHeight - ((point.aqi - minAQI) / range) * chartHeight;
        ctx.beginPath();
        ctx.arc(x,y,4,0,2 * Math.PI);
        ctx.fill();
      });

      //Draw labels
      ctx.fillStyle = '#4a5568';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';

      // Add AQI level labels
      ctx.textAlign = 'left';
      ctx.font = '10px Arial';
      const aqiLabels = ['Very Poor', 'Poor', 'Moderate', 'Fair', 'Good'];
      for(let i = 0; i <= 4; i++){
        const y = margin + (i * chartHeight / 4);
        const label = aqiLabels[i];
        ctx.fillStyle = '#718096';
        ctx.fillText(label, margin - 60, y + 4);
      }

      //X-axis labels (hours)
      for(let i= 0; i < chartData.length ; i+= 4){
        const x = margin + (i * chartWidth / (chartData.length - 1));
        ctx.fillText(`${chartData[i].hour}:00`, x, height - 10);

      }

      //Y-axis labels (AQI values)
      ctx.textAlign = 'right';
      for(let i =0 ; i<=4; i++){
        const y = margin + (i * chartHeight/4);
        const value = maxAQI - i;
        ctx.fillText(value.toString(), margin - 10 , y + 4);
      }

      // Add title
      ctx.fillStyle = '#2d3748';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Air Quality Index (Last 24 Hours)', width / 2, 20);
    }
  },[chartData])


  return (
    <div id='chart' className= {`fade-in bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8 
          transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      > 
      {/* title */}
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
        📊 Air Quality Trends (24 Hours)
      </h3>
      <div>
        <canvas 
          ref={canvasRef}
          width={800}
          height={400}
          className='max-w-full h-auto border rounded-lg'
        />
      </div>
    </div>
  )
}

export default AQChart