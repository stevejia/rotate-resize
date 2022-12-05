import { ProxyStateComponent } from "proxy-state-react";
import React from "react";
import RotateResize from "../../lib";
import { CompData } from "../../lib/types";

import "./index.less";

interface TestState {
  compData: CompData;
  compData2: CompData;
}

export default class TestRotateResize extends ProxyStateComponent<
  any,
  TestState
> {
  private ref: HTMLDivElement | undefined;
  private rotateResize: RotateResize | undefined;
  private rotateResize2: RotateResize | undefined;
  constructor(props: any) {
    const initalState: TestState = {
      compData: { left: 200, top: 200, width: 300, height: 300, rotate: 125 },
      compData2: {left: 100, top: 100, width: 200, height: 200, rotate: 30}
    };
    super(initalState, props);
  }

  componentDidMount(): void {
    if (!this.ref) {
      return;
    }
    if (this.rotateResize) {
      return;
    }
    const rotateResize = new RotateResize(
      { compData: this.state.compData, selector: true },
      this.ref
    );
    rotateResize.on("resize-start", () => {
      console.log("resize start");
    });
    rotateResize.on("resize", (compData: any) => {
      console.log("resizing");
      this.state.compData = { ...compData };
    });
    rotateResize.on("resize-end", () => {
      console.log("resize end");
    });
    rotateResize.on("rotate-start", () => {
      console.log("rotate start");
    });
    rotateResize.on("rotate", (deg: number) => {
      console.log("rotating");
      this.state.compData = { ...this.state.compData, ...{ rotate: deg } };
    });
    rotateResize.on("rotate-end", () => {
      console.log("rotate end");
    });
    this.rotateResize = rotateResize;
  }

  onResize(index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    this.rotateResize!.resize(
      e,
      JSON.parse(JSON.stringify({ ...this.state.compData })),
      index,
      1
    );
  }

  render() {
    const {
      compData: { rotate, ...restData },
    } = this.state;
    return (
      <div className="container">
        <div>
          <div>内置的选中框</div>
          <div
            className="component"
            style={{ ...restData, ...{ transform: `rotate(${rotate}deg)` } }}
            ref={(ref) => (this.ref = ref)}
            id="test-component"
          >
            <div></div>
          </div>
        </div>
        <div>
          <div>自定义的选中框</div>
          <div
            className="component"
            style={{ ...restData, ...{ transform: `rotate(${rotate}deg)` } }}
            ref={(ref) => (this.ref = ref)}
            id="test-component"
          >
            <div className="component-select">
              <div
                onMouseDown={(e) => this.onResize(0, e)}
                className="select-item top-left"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(1, e)}
                className="select-item top-center"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(2, e)}
                className="select-item top-right"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(3, e)}
                className="select-item center-right"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(4, e)}
                className="select-item bottom-right"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(5, e)}
                className="select-item bottom-center"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(6, e)}
                className="select-item bottom-left"
              ></div>
              <div
                onMouseDown={(e) => this.onResize(7, e)}
                className="select-item center-left"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
