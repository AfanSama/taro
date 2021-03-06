/**
 * ✔ onChange(bindchange)
 *
 * @warn No support of props FOR, you must put checkbox below label straightly.
 *
 * @flow
 */

import * as React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

type Props = {
  children?: React.Node,
  style?: StyleSheet.Styles,
  onChange?: Function
}

class _CheckboxGroup extends React.Component<Props> {
  props: Props

  values: Array<{ value: any, checked: boolean }> = []
  // checkboxs: React.Node = []

  toggleChange = (e: { value: *, checked: boolean }, index: number) => {
    const { onChange } = this.props
    this.values[index] = {
      value: e.value,
      checked: e.checked
    }
    onChange && onChange({
      detail: {
        value: this.values.filter((item) => item && item.checked).map((item) => item.value)
      }
    })
  }

  render () {
    const {
      children,
      style,
    } = this.props

    const mapChildren = React.Children.toArray(children).map((labelItem, index) => {
      const chd = React.Children.toArray(labelItem.props.children).map((child) => {
        if (child.type.name === '_Checkbox') {
          const { value, disabled, checked, color } = child.props
          this.values[index] = { value, checked }
          return React.cloneElement(child, {
            onChange: (e) => this.toggleChange(e, index),
            value,
            disabled,
            checked,
            color
          })
        }
        return child
      })

      return React.cloneElement(labelItem, '', chd)
    })

    return (
      <View style={style}>
        {mapChildren}
      </View>
    )
  }
}

export default _CheckboxGroup
