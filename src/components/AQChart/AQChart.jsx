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
      const margin = 40;
      const chartWidth = width -2 * margin;
      const chartHeight = height - 2 * margin;
      const maxAQI = Math.max(...chartData.map(d => d.aqi));
      const minAQI = Math.map(...chartData.map(d => d.aqi));
      const range = maxAQI - minAQI || 1;


      //Draw background
      ctx.fillStyle = '#f7fafc';
      ctx.fillRect(0,0,width,height);

      //Draw grid lines
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;

      for(let i =0;i<= 5; i++){
        const y = margin + (1 * chartHeight/ 5);
        ctx.brginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
      }

      //Draw chart line
      ctx.strokeStyle = '#4299e1';
      ctx.lineWidth = 3;
      ctx.beinPath();
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
        ctx.beinPath();
        ctx.arc(x,y,4.0,2 * Math.PI);
        ctx.fill();
      });

      //Draw labels
      ctx.fillStyle = '#4a5568';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';


      //X-axis labels (hours)
      for(let i= 0; i < chartData.length ; i+= 4){
        const x = margin + (i * chartWidth / (chartData.length - 1));
        ctx.fillText(`${chartData[i].hour}:00`, x, height - 10);

      }

      //Y-axis labels (AQI values)
      ctx.textAlign = 'right';
      for(let i =0 ; i<=5; i++){
        const y = margin + (i * chartHeight/5);
        const value = Math.round(maxAQI - (i * range/5));
        ctx.fillText(value.toString(), margin - 10 , y + 4);
      }
    }
  },[chartData])


  return (
    <div className= {`fade-in bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8 
          transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      > 
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