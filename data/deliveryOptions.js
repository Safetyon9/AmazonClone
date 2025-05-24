export const deliveryOptions =[{
    id: '1',
    deliveryDays: '7',
    priceCents: 0
}, {
    id: '2',
    deliveryDays: '3',
    priceCents: 499
}, {
    id: '3',
    deliveryDays: '1',
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

const isWeekend = theDay => theDay === 'Saturday' || theDay ==='Sunday';

export function deliveryDaysCalculator(day,addToDay) {
    while(Number(addToDay)>0) {
        day = day.add(1,'days');
        
        if(!isWeekend(day.format('dddd'))) {
            addToDay--;
        }
    }
    return day;
}