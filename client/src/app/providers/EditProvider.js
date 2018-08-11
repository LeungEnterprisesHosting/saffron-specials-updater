import React, { Component } from 'react';
import { isNil } from 'lodash';
import {
  APPETIZER,
  ENTREE,
  CREATE,
  UPDATE,
  DESTROY,
} from '../constants';

const preSaveHooks = [
  function checkMonthAndYear(state) {
    // Check if current month and year matches the update
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const { month: enteredMonth, year: enteredYear } = state.newData.current;
    const currentMonth = monthNames[now.getMonth()];
    const monthMatches = (enteredMonth === currentMonth)
    const monthOk = monthMatches
                    || (currentMonth === 'July' && enteredMonth === 'July-August');
    const yearOk = (enteredYear === currentYear);
    if (!monthOk && !yearOk) {
      return (
        `The current month is "${currentMonth}" and the current year `
        + `is "${currentYear}", but you entered "${enteredMonth}" for the month `
        + `and "${enteredYear}" for the year. Note: the month field is case-`
        + `sensitive and will appear on the website exactly as you type it.`
      );
    } else if (!monthOk) {
      return (
        `The current month is "${currentMonth}", but you entered `
        + `"${enteredMonth}" for the month instead. Note: the month field is case-`
        + `sensitive and will appear on the website exactly as you type it.`
      );
    } else if (!yearOk) {
      return (
        `The current year is "${currentYear}", but you entered "${enteredYear}"`
        + `for the year instead. Did you forget to change it?`
      );
    }
    return null;
  },
  function checkIsAdding(state) {
    if (state.adding) {
      return 'It looks like you\'re still adding an appetizer or entree. '
             + 'Did you forget to click the green "+" button to add it to '
             + 'the list?'
    }
    return null;
  }
];

class EditProvider extends Component {
  constructor(props) {
    super(props);
    const { specials, current } = props.initialData;
    const { appetizers, entrees } = specials;

    this.state = {
      editing: false,
      saving: false,
      saveIssues: [],
      confirmedSaving: false,
      adding: false,
      // We could just say newData: initialData,
      // but I prefer to be explicit about the
      // structure here.
      newData: {
        specials: {
          appetizers,
          entrees,
        },
        current,
      },
    };

    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onConfirmSave = this.onConfirmSave.bind(this);
    this.onCancelSave = this.onCancelSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeCurrent = this.onChangeCurrent.bind(this);
    this.onChangeSpecials = this.onChangeSpecials.bind(this);
    this.onChangeAdding = this.onChangeAdding.bind(this);
  }

  onEdit() {
    this.setState({
      editing: true,
    });
  }

  async onSave() {
    const issues =
      preSaveHooks
        .map(hook => hook(this.state))
        .filter(i => !isNil(i));

    this.setState({
      saveIssues: issues,
      saving: true,
    });
  }

  async onCancelSave() {
    this.setState({
      saving: false,
      saveIssues: [],
    });
  }

  async onConfirmSave() {
    const { saveData } = this.props;
    const { newData } = this.state;

    this.setState({
      confirmedSaving: true,
    });

    await saveData(newData);
    this.setState({
      confirmedSaving: false,
      saving: false,
      editing: false,
      saveIssues: [],
    });
  }

  onCancel() {
    const { initialData } = this.props;

    this.setState({
      newData: initialData,
      editing: false,
    });
  }

  onChangeCurrent(newCurrent) {
    // Make sure we're creating a new
    // object at each level of the
    // hierarchy
    this.setState({
      newData: {
        ...this.state.newData,
        current: newCurrent,
      },
    });
  }

  onChangeSpecials(group, index, action, newSpecial) {
    const { newData } = this.state;

    const key = (group === APPETIZER) ? 'appetizers' : 'entrees';

    const specialsGroup = newData.specials[key];

    let newSpecialsGroup;
    if (action == CREATE) {
      newSpecialsGroup = [
        ...specialsGroup.slice(0, index),
        newSpecial,
        ...specialsGroup.slice(index),
      ];
    }

    if (action == UPDATE) {
      newSpecialsGroup = [
        ...specialsGroup.slice(0, index),
        newSpecial,
        ...specialsGroup.slice(index + 1),
      ];
    }

    if (action === DESTROY) {
      newSpecialsGroup = [
        ...specialsGroup.slice(0, index),
        ...specialsGroup.slice(index + 1),
      ];
    }

    this.setState({
      newData: {
        ...newData,
        specials: {
          ...newData.specials,
          [key]: newSpecialsGroup,
        }
      }
    });
  }

  onChangeAdding(newAdding) {
    this.setState({
      adding: newAdding,
    });
  }

  render() {
    return this.props.render({
      ...this.state,
      onEdit: this.onEdit,
      onSave: this.onSave,
      onConfirmSave: this.onConfirmSave,
      onCancelSave: this.onCancelSave,
      onCancel: this.onCancel,
      onChangeCurrent: this.onChangeCurrent,
      onChangeSpecials: this.onChangeSpecials,
      onChangeAdding: this.onChangeAdding,
    });
  }
}

export default EditProvider;