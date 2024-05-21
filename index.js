document.querySelectorAll('.pricing-option').forEach(option => {
    option.addEventListener('mouseenter', () => {
        option.classList.add('shadow');
    });
    option.addEventListener('mouseleave', () => {
        option.classList.remove('shadow');
    });
});

const initialPricesAndCurrencies = {};

const initializeInitialPricesAndCurrencies = () => {
    const pricingOptions = document.querySelectorAll('.pricing-option');
    pricingOptions.forEach(option => {
        const priceParagraph = option.querySelector('p');
        const heading = option.querySelector('h2').textContent.trim();
        const priceMatch = priceParagraph.textContent.match(/\d+(\.\d+)?/);
        initialPricesAndCurrencies[heading] = {
            price: parseFloat(priceMatch[0]),
            currency: getPriceCurrency(priceParagraph.textContent)
        };
    });
};

const getPriceCurrency = (priceText) => {
    const currencies = ['$', '£', '₹'];
    return currencies.find(currency => priceText.includes(currency)) || '₹';
};

window.addEventListener('DOMContentLoaded', initializeInitialPricesAndCurrencies);

const countrySelect = document.getElementById('country');
const slider = document.querySelector('.toggle');

slider.addEventListener('change', () => {
    updatePrices(countrySelect.value);
});

countrySelect.addEventListener('change', () => {
    updatePrices(countrySelect.value);
});

const updatePrices = (selectedCountry) => {
    const pricingOptions = document.querySelectorAll('.pricing-option');

    pricingOptions.forEach(option => {
        const priceParagraph = option.querySelector('p');
        const heading = option.querySelector('h2').textContent.trim();
        const { price, currency } = initialPricesAndCurrencies[heading];

        let calculatedPrice = price;
        if (slider.checked) {
            calculatedPrice *= 9;
        }

        calculatedPrice = Math.floor(calculatedPrice);

        let currencyValue;
        if (selectedCountry === 'us') {
            currencyValue = Math.floor(calculatedPrice / 83);
        } else if (selectedCountry === 'uk') {
            currencyValue = Math.floor(calculatedPrice / 105);
        } else {
            currencyValue = calculatedPrice;
        }

        let currencySymbol;
        switch (selectedCountry) {
            case 'us':
                currencySymbol = '$';
                break;
            case 'uk':
                currencySymbol = '£';
                break;
            default:
                currencySymbol = '₹'; 
        }
        let priceString = `Price: ${currencySymbol}${currencyValue}`;

        priceString += slider.checked ? '/year' : '/month';

        priceParagraph.textContent = priceString;
    });
};

updatePrices(countrySelect.value);
