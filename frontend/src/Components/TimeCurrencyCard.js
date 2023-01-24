import styles from "./TimeCurrencyCard.module.css"


/* 
:currency:
    the current chose currency
:type:
    string
:showData:
    array of bitcoin data object with timestamp and price
:type:
    list[{dict}]
*/
function TimeCurrencyCard ({currency,showData}) {
    /* 
    set price text color
    :index:
        the index of the current object
    :type:
        int
    :return:
        CSS classname
    :rtype:
        CSS  Object
    */
    const priceColor = (index) => {
        if (index == 0 || showData[index]['price'] == showData[index-1]['price']) {
            return styles.priceContainerEqual
        } else if (showData[index]['price'] > showData[index-1]['price']) {
            return styles.priceContainerUp
        } else {
            return styles.priceContainerDown
        }
    }

    /* 
    set arrow sign for price
    :index:
        the index of the current object
    :type:
        int
    :return:
        an arrow "↑" "↓" or '-' to show the price change status
    :rtype:
        string
    */
    const arrowSign = (index) => {
        if (index == 0 || showData[index]['price'] == showData[index-1]['price']) {
            return '-'
        } else if (showData[index]['price'] > showData[index-1]['price']) {
            return '↑'
        } else {
            return '↓'
        }
    }
    
    return (
        <div>
        {/* reference for .map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
        <div className={styles.header}>
            <div className={styles.rowElement1}>&emsp; &emsp; Time</div>
            <div className={styles.rowElement2}>Price of BTC in {currency}</div>
        </div>
        <div className={styles.cardContainer}></div>
            {showData.map((d, index) => (
                <div className={styles.cardContainer}>
                    <div className={styles.timeContainer}>
                        <div className={styles.timestamp}>
                            {d['timestamp']}
                        </div>
                        <div className={priceColor(index)}>
                            {currency === 'USD' ? "$" : "€"}{d['price']}{" "}{arrowSign(index)}
                        </div>
                    </div>
                </div>
            ))} 
        </div>      
    );

}

export default TimeCurrencyCard;
