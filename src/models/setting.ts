
export interface ISettingModelState {

}

export interface ISettingModel {
  name: 'setting',
  state: ISettingModelState
}

const SettingModel: ISettingModel = {
  name: 'setting',
  state: {}
};

export default SettingModel;
