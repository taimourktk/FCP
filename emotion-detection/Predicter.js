class PredictEmotion {

    constructor (samples) {
        this.positiveBag = {};
        this.negativeBag = {};
        this.nPositiveSamples = 0;
        this.nNegativeSamples = 0;

        samples.forEach(sample => {
            
            let tokens = sample.content.split(' ').map(token => token.toLowerCase());
            tokens.forEach(token => {
                this.setCount('inc', { word: token, negative: !sample.isNegative });
            });

            if (sample.isNegative) {
                this.nPositiveSamples ++;
            }
            else {
                this.nNegativeSamples ++;
            }

        });

    }
    
    setCount (action, payload) {
        let bag = payload.negative ? this.negativeBag: this.positiveBag;
        if (action === 'inc') {
            if (bag[payload.word])
                bag[payload.word]++;
            else
                bag[payload.word] = 1;
        }
        else if (action === 'set') {
            bag[payload.word] = payload.count;
        }
    }

    getCount (word, negative=false, offset = 1) {
        let bag = negative ? this.negativeBag: this.positiveBag;
        return (bag[word] || 0) + offset;
    }

    get count() {
        return { 
            pb: this.positiveBag, 
            nb: this.negativeBag, 
            ns: this.nNegativeSamples, 
            ps:  this.nPositiveSamples
        }
    }

    predict (input) {
        let pPos = this.nPositiveSamples / (this.nNegativeSamples + this.nPositiveSamples);
        let pNeg = this.nNegativeSamples / (this.nNegativeSamples + this.nPositiveSamples);

        input.split(' ')
            .map(token => token.toLowerCase())
            .forEach(word => {
                let nPos = this.getCount( word, false );
                let nNeg = this.getCount( word, true );

                pNeg *= nNeg / (nPos + nNeg);
                pPos *= nPos / (nPos + nNeg);

            });

        return pPos > pNeg;

    }
};

module.exports = PredictEmotion;