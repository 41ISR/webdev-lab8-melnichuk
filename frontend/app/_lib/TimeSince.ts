interface TimePeriod {
  time: number;
  name: string;
}

export default function timeSince(dateStr: string): string {
   const date = new Date(dateStr)

  const periods: TimePeriod[] = [
    { time: 31536000, name: 'año' },
    { time: 2592000, name: 'mes' },
    { time: 86400, name: 'día' },
    { time: 3600, name: 'hora' },
    { time: 60, name: 'minuto' },
    { time: 1, name: 'segunda' }
  ];
  
  let elapsed: number = Math.floor((Date.now() - date.getTime()) / 1000);
    
  for (let { time, name } of periods) {
    if (elapsed >= time) {
      let count: number = Math.floor(elapsed / time);
      return `${count} ${name}${count > 1 ? name == 'mes' ? 'es' : 's' : ''} назад`;
    }
  }
  
  return "только что";
}

