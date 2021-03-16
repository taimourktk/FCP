import React from 'react' 
import {View, Text, Image, ScrollView} from 'react-native'
import Unit from './News.Unit'
import styles from './News.Style'
import request from '../../utils/request'

const News = (props) => {

    const [news, setNews] = React.useState([]);

    React.useEffect(() => {

        request({
            route: 'news',
            type: 'GET'
        }).then(res => {
            if (res.status === 'success')
                setNews(res.data);
        })

    }, [])

    return (
    <ScrollView
        style={styles.container}
    >
    {news.map((news, index) => (
        <Unit
            highlight={news.highlight}
            body={news.body}
            createdAt={news.createdAt}
            image={news.image}
            key={index}
        />
    ))}
    </ScrollView>
    )
}

export default News;