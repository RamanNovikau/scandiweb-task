/* eslint-disable */

import './ProgressBar.style.scss';

class ProgressBar extends React.PureComponent {
    state = {}
    render() {

        const { steps } = this.props;

        return (
            <div block="ProgressBar" elem="Wrapper">
                <div block="ProgressBar" elem="Progress">

                    <div block="ProgressBar" elem="Progress-track"></div>

                    {steps.map(step => {
                        return (
                            <div block="ProgressBar" elem={`Progress-step ${step.active ? 'active' : ''} ${step.complete ? 'complete' : ''}`}>
                                <div block="ProgressBar" elem="Step-wrapper">
                                    <div block="ProgressBar" elem={`Step-content ${step.active ? 'active' : ''}`}>{step.complete ? '' : step.id}</div>
                                    <div block="ProgressBar" elem="Step-title">{step.title}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ProgressBar;