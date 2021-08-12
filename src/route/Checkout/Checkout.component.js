/* eslint-disable */
import ProgressBar from 'Component/ProgressBar.component'
import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'
import { appendWithStoreCode } from 'Util/Url';

import {
    BILLING_STEP,
    CHECKOUT_URL,
    DETAILS_STEP,
    SHIPPING_STEP
} from './Checkout.config';

export class Checkout extends SourceCheckout {

    stepMap = {
        [SHIPPING_STEP]: {
            id: 1,
            title: __('Shipping step'),
            url: '/shipping',
            render: this.renderShippingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this)
        },
        [BILLING_STEP]: {
            id: 2,
            title: __('Billing step'),
            url: '/billing',
            render: this.renderBillingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this)
        },
        [DETAILS_STEP]: {
            title: __('Thank you for your purchase!'),
            url: '/success',
            render: this.renderDetailsStep.bind(this),
            areTotalsVisible: false
        }
    };

    state = {
        steps: [
            {
                id: 1,
                active: false,
                complete: false,
                title: 'Shipping',
            },
            {
                id: 2,
                active: false,
                complete: false,
                title: 'Payment',
            }]
    };

    componentDidMount() {
        const { checkoutStep, history } = this.props;
        const { url, id } = this.stepMap[checkoutStep];

        this.updateHeader();
        this.updateProgressBar(id);


        history.replace(appendWithStoreCode(`${CHECKOUT_URL}${url}`));
    }

    updateStep() {
        const { checkoutStep, history } = this.props;
        const { url, id } = this.stepMap[checkoutStep];
        this.updateProgressBar(id);

        history.push(appendWithStoreCode(`${CHECKOUT_URL}${url}`));


    }

    updateProgressBar(id) {
        const steps = [...this.state.steps];

        this.setState({
            steps: [...steps.map(s => {
                if (!id) {
                    s.active = true;
                    s.complete = true;
                }
                if (s.id > id) {
                    s.active = false;
                    s.complete = false;
                }
                if (s.id === id) {
                    s.active = true;
                    s.complete = false;
                }
                if (s.id < id) {
                    s.complete = true;
                }
                return s;
            })]
        });
    }

    render() {

        return (
            <>
                <ProgressBar steps={this.state.steps} />
                {super.render()}
            </>
        );
    }
}

export default Checkout;