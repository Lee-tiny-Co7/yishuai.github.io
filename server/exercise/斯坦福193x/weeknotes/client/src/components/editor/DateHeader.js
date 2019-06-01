/* @flow */

import React, { Component } from 'react';

import DateArrow from './DateArrow'
import DateUtil from '../../lib/DateUtil'
import './DateHeader.css';

class DateHeader extends Component {
  state: {
    arrowsActive: boolean,
    stickyActive: boolean
  };

  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
  onBlur: () => void;
  incrementWeek: () => void;
  decrementWeek: () => void;
  resetWeek: () => void;

  constructor() {
    super();
    this.state = {
      arrowsActive: false,
      stickyActive: false
    };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.incrementWeek = this.incrementWeek.bind(this);
    this.decrementWeek = this.decrementWeek.bind(this);
    this.resetWeek = this.resetWeek.bind(this);
  }

  // Override
  render() {
    return (
      <h2 id="date-header"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <span
          onFocus={this.onClick}
          onBlur={this.onBlur}
          tabIndex="0">
          <DateArrow
            direction='left'
            active={this.state.arrowsActive}
            onClick={this.decrementWeek}
          />
          <span className='range'
            onClick={this.resetWeek}>
            {this.getDateRange()}
          </span>
          <DateArrow
            direction='right'
            active={this.state.arrowsActive}
            onClick={this.incrementWeek}
          />
        </span>
      </h2>
    );
  }

  getDateRange() {
    const getStartDateString = () => {
      const start = this.props.week.getStartOfRange();
      return DateUtil.getDayString(start) + ' ' +
        DateUtil.getMonthString(start) + ' ' + start.getDate();
    }

    const getEndDateString = () => {
      const end = this.props.week.getEndOfRange();
      return DateUtil.getDayString(end) + ' ' +
        DateUtil.getMonthString(end) + ' ' + end.getDate() + ', ' +
        end.getFullYear();
    }
    return getStartDateString() + ' - ' + getEndDateString();
  }

  onMouseOver() {
    this.setState({
      arrowsActive: true 
    });
  }

  onMouseOut() {
    if (!this.state.stickyActive) {
      this.setState({
        arrowsActive: false
      });
    }
  }

  onClick() {
    this.setState({
      arrowsActive: true,
      stickyActive: true
    });
  }

  onBlur() {
    this.setState({
      arrowsActive: false,
      stickyActive: false 
    });
  }

  incrementWeek() {
    this.props.onUpdateWeek('increment');
  }

  decrementWeek() {
    this.props.onUpdateWeek('decrement');
  }

  resetWeek() {
    this.props.onUpdateWeek('reset');
  }
}
DateHeader.propTypes = {
  week: React.PropTypes.object,
  onUpdateWeek: React.PropTypes.func
};

export default DateHeader;

