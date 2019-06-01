import MockDate from 'mockdate';

import WeekDate from '../WeekDate';

const SUN_DEC_27_2015 = new Date('Sun Dec 27 2015');
const MON_DEC_28_2015 = new Date('Mon Dec 28 2015');
const FRI_JAN_1_2016 = new Date('Fri Jan 01 2016');
const SAT_JAN_2_2016 = new Date('Sat Jan 02 2016');
const SUN_AUG_28_2016 = new Date('Sun Aug 28 2016');
const TUE_AUG_30_2016 = new Date('Tue Aug 30 2016');
const THU_SEPT_1_2016 = new Date('Thu Sep 01 2016');
const SAT_SEPT_3_2016 = new Date('Sat Sep 03 2016');
const SUN_SEPT_4_2016 = new Date('Sun Sep 04 2016');
const MON_SEPT_5_2016 = new Date('Mon Sep 05 2016');
const SAT_SEPT_10_2016 = new Date('Sat Sep 10 2016');

describe('getStartOfRange() tests', () => {
  it('start range works when sunday', () => {
    const weekdate = new WeekDate(SUN_SEPT_4_2016);
    expect(weekdate.getStartOfRange()).toEqual(SUN_SEPT_4_2016);
  });

  it('start range works when middle of week', () => {
    const weekdate = new WeekDate(MON_SEPT_5_2016);
    expect(weekdate.getStartOfRange()).toEqual(SUN_SEPT_4_2016);
  });

  it('start range works across months', () => {
    const weekdate = new WeekDate(THU_SEPT_1_2016);
    expect(weekdate.getStartOfRange()).toEqual(SUN_AUG_28_2016);
  });

  it('start range works across years', () => {
    const weekdate = new WeekDate(FRI_JAN_1_2016);
    expect(weekdate.getStartOfRange()).toEqual(SUN_DEC_27_2015);
  });
});

describe('getEndOfRange() tests', () => {
  it('end range works when saturday', () => {
    let weekdate = new WeekDate(SAT_SEPT_10_2016);
    expect(weekdate.getEndOfRange()).toEqual(SAT_SEPT_10_2016);
  });

  it('end range works when middle of week', () => {
    const weekdate = new WeekDate(MON_SEPT_5_2016);
    expect(weekdate.getEndOfRange()).toEqual(SAT_SEPT_10_2016);
  });

  it('end range works across months', () => {
    const weekdate = new WeekDate(TUE_AUG_30_2016);
    expect(weekdate.getEndOfRange()).toEqual(SAT_SEPT_3_2016);
  });

  it('end range works across years', () => {
    const weekdate = new WeekDate(MON_DEC_28_2015);
    expect(weekdate.getEndOfRange()).toEqual(SAT_JAN_2_2016);
  });
});

describe('incrementWeek() tests', () => {
  it('increment week advances correctly saturday', () => {
    const weekdate = new WeekDate(SAT_SEPT_3_2016);
    weekdate.incrementWeek();
    expect(weekdate.getStartOfRange()).toEqual(SUN_SEPT_4_2016);
  });

  it('increment week advances correctly sunday', () => {
    const weekdate = new WeekDate(SUN_AUG_28_2016);
    weekdate.incrementWeek();
    expect(weekdate.getStartOfRange()).toEqual(SUN_SEPT_4_2016);
  });
});

describe('decrementWeek() tests', () => {
  it('decrement week decreases correctly saturday', () => {
    const weekdate = new WeekDate(SAT_SEPT_10_2016);
    weekdate.decrementWeek();
    expect(weekdate.getStartOfRange()).toEqual(SUN_AUG_28_2016);
  });

  it('decrement week decreases correctly sunday', () => {
    const weekdate = new WeekDate(SUN_SEPT_4_2016);
    weekdate.decrementWeek();
    expect(weekdate.getStartOfRange()).toEqual(SUN_AUG_28_2016);
  });
});

describe('constructor / getToday tests', () => {
  it('empty constructor creates new date for today', () => {
    // Set today's date as Sept 1st, 2016.
    MockDate.set(THU_SEPT_1_2016.valueOf());

    const weekdate = new WeekDate();
    expect(weekdate.getToday()).toEqual(THU_SEPT_1_2016);

    MockDate.reset();
  });

  it('null constructor creates new date for today', () => {
    // Set today's date as Sept 1st, 2016.
    MockDate.set(THU_SEPT_1_2016.valueOf());

    const weekdate = new WeekDate(null);
    expect(weekdate.getToday()).toEqual(THU_SEPT_1_2016);

    MockDate.reset();
  });
});
