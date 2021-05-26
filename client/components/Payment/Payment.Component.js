import React from 'react';
import { WebView, View } from 'react-native-webview';
import { Text } from 'react-native';
import queryString from "query-string";
import request from '../../utils/request';

const api = `https://sandbox.api.getsafepay.com/components`;
const params = `?beacon=${"track_08cae998-cc50-4824-a30b-408532031944"}&order_id=${123}&source=mobile`;

const checkoutUrl2 = "https://sandbox.api.getsafepay.com/components?env=sandbox&beacon=track_9b7c7c51-fcdf-4202-bc97-4a63c3276ace&order_id=1621359657390&source=mobile&redirect_url=https%3A%2F%2Fexample.com%2Fpayment-complete&cancel_url=https%3A%2F%2Fexample.com%2Fpayment-cancelled"

export default function (props) {

    const [checkoutUrl, setCheckoutUrl] = React.useState('');
    const [amount, setAmount] = React.useState(props.amount);

    const getCheckoutUrl = async () => {
        let res = await request({
            route: 'payment?amount=' + props.amount
        });
        if (res.url) {
            setCheckoutUrl(res.url)
        }
        else {
            alert("Error")
        }
    }

    React.useEffect(() => {
        getCheckoutUrl();
    }, [amount])

    const onNavigationChangeState = (event) => {
        console.log("Event", event);
        console.log("***************************")
        const url = event.url;
        if (url.indexOf("/mobile") === -1) {
            return;
        }
        const parsed = queryString.parse(params);
        if (parsed.action === "cancel") {
            return props.onFailure();
        }
        if (parsed.action === "complete") {
            alert('Done Payment')
            props.onSuccess();
        }
    }

    return checkoutUrl ? (
        <WebView
            source={{ uri: checkoutUrl }}
            onNavigationChangeState={onNavigationChangeState}
            onError={(m) => console.log("Err", m)}
            onMessage={(m) => console.log("Mess", m)}
        />) : <Text>Loading</Text>
}

