class FinancialLibrary {

  // function to calculate return on investment
  static calculateROI(investment, returns) {
    const roi = ((returns - investment) / investment) * 100;
    return roi;
  }

  // function to calculate Internal Rate of Return (IRR)
  static calculateIRR(cashFlows) {
    let min = -1;
    let max = 1;
    while ((max - min) > 0.0001) {
      const guess = (min + max) / 2;
      const npv = this.calculateNPV(cashFlows, guess);
      if (npv > 0) {
        min = guess;
      } else {
        max = guess;
      }
    }
    return parseFloat(((min + max) / 2 * 100).toFixed(2));
  }

  // function to calculate Extended Internal Rate of Return (XIRR)
  static calculateXIRR(cashFlows, dates) {
    let guess = 0.1;
    let npv = 0;
    let oldNpv = 0;
    do {
      oldNpv = npv;
      npv = 0;
      for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + guess, (dates[i] - dates[0]) / 365);
      }
      guess += (npv / oldNpv - 1) || 0.1;
    } while(Math.abs(npv - oldNpv) > 0.0001);
    return parseFloat((guess * 100).toFixed(2));
  }

  // function to calculate Present Value (PV)
  static calculatePV(rate, periods, payment, futureValue, type) {
    futureValue = typeof futureValue !== 'undefined' ? futureValue : 0;
    type = typeof type !== 'undefined' ? type : 0;
    if (rate === 0) {
      return -payment * periods - futureValue;
    } else {
      const pv = (-payment * (1 + rate * type) * (Math.pow(1 + rate, periods) - 1) / rate) - futureValue / Math.pow(1 + rate, periods);
      return parseFloat(pv.toFixed(2));
    }
  }

  // function to calculate Net Present Value (NPV)
  static calculateNPV(rate, cashFlows) {
    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate, i + 1);
    }
    return parseFloat(npv.toFixed(2));
  }

  // function to calculate Future Value (FV)
  static calculateFV(rate, periods, payment, presentValue, type) {
    presentValue = typeof presentValue !== 'undefined' ? presentValue : 0;
    type = typeof type !== 'undefined' ? type : 0;
    if (rate === 0) {
      return -presentValue - payment * periods;
    } else {
      const fv = -presentValue * Math.pow(1 + rate, periods) - payment * (1 + rate * type) * (Math.pow(1 + rate, periods) - 1) / rate;
      return parseFloat(fv.toFixed(2));
    }
  }

  // function to calculate EMI
  static calculateEMI(principal, rate, periods) {
    const r = rate / 1200
       const emi = (principal * r * Math.pow((1 + r), periods)) / (Math.pow((1 + r), periods) - 1);
    return parseFloat(emi.toFixed(2));
  }
}
