import React from 'react';
import { withPrefix } from '../utils';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
              <span>© 2026 Kathleen Broussard · </span><a href={withPrefix('/CV_Broussard.pdf')}>Curriculum vitae</a>
            </footer>
        );
    }
}
