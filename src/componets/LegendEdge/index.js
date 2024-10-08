import {useContext, createElement, useState, useEffect} from 'react';
import {GraphinContext} from '@antv/graphin';
import './index.css';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// var _react = _interopRequireWildcard(require("react"));

// var _index = require("../../index");

// require("./index.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LegendEdge = function LegendEdge(props) {
  var _React$useContext = useContext(GraphinContext),
      graph = _React$useContext.graph,
      theme = _React$useContext.theme;

  var defaultOptions = props.options,
      dataMap = props.dataMap,
      onChange = props.onChange;
  var mode = theme.mode;

  var _React$useState = useState({
    options: defaultOptions
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];
  /** 更新state依赖 */


  (0, useEffect)(function () {
    setState({
      options: defaultOptions
    });
  }, [defaultOptions]);
  var options = state.options;

  var handleClick = function handleClick(option) {
    var checkedValue = Object.assign(Object.assign({}, option), {
      checked: !option.checked
    });
    var result = options.map(function (c) {
      var matched = c.value === option.value;
      return matched ? checkedValue : c;
    });
    setState({
      options: result
    });
    var nodes = dataMap.get(checkedValue.value);
    /** highlight */
    // const nodesId = nodes.map((c) => c.id);
    // apis.highlightNodeById(nodesId);
    // @ts-ignore

    nodes.forEach(function (node) {
      graph.setItemState(node.id, 'normal', checkedValue.checked);
      graph.setItemState(node.id, 'inactive', !checkedValue.checked);
    //   var id = node.id;
    //   var item = graph.findById(id);
    //   console.log(item, node, item.getType());
    //   var edges = item.getEdges();
    //   edges.forEach(function (edge) {
    //     graph.setItemState(edge, 'normal', checkedValue.checked);
    //     graph.setItemState(edge, 'inactive', !checkedValue.checked);
    //   });
    });
    onChange(checkedValue, result);
  };

  return /*#__PURE__*/createElement("ul", {
    className: "graphin-components-legend-content"
  }, options.map(function (option) {
    var label = option.label,
        checked = option.checked,
        color = option.color;
    var dotColors = {
      light: {
        active: color,
        inactive: '#ddd'
      },
      dark: {
        active: color,
        inactive: '#2f2f2f'
      }
    };
    var labelColor = {
      light: {
        active: '#000',
        inactive: '#ddd'
      },
      dark: {
        active: '#fff',
        inactive: '#2f2f2f'
      }
    };
    var status = checked ? 'active' : 'inactive';
    return /*#__PURE__*/createElement("li", {
      key: option.value,
      className: "item",
      onClick: function onClick() {
        handleClick(option);
      },
      onKeyDown: function onKeyDown() {
        handleClick(option);
      }
    }, /*#__PURE__*/createElement("span", {
      className: "dot",
      style: {
        background: dotColors[mode][status] ?? '#d9d9d9'
      }
    }), /*#__PURE__*/createElement("span", {
      className: "label",
      style: {
        color: labelColor[mode][status]
      }
    }, label));
  }));
};

// var _default = LegendEdge;
// exports.default = _default;

export default LegendEdge;
