System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, input, Input, _dec, _class, _crd, ccclass, property, Player;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      input = _cc.input;
      Input = _cc.Input;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "19321bZPkBHT4OiKJzgSIw9", "PlayerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec3', 'input', 'Input', 'EventMouse', 'Animation']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Player", Player = (_dec = ccclass('PlayerController'), _dec(_class = class Player extends Component {
        constructor(...args) {
          super(...args);
          this._startJump = false;
          this._jumpStep = 0;
          this._curJumpTime = 0;
          this._jumpTime = 0.3;
          this._curJumpSpeed = 0;
          this._curPos = new Vec3();
          this._deltaPos = new Vec3(0, 0, 0);
          this._targetPos = new Vec3();
        }

        start() {
          // [3]
          input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        onMouseUp(event) {
          if (event.getButton() === 0) {
            this.jumpByStep(1);
          } else if (event.getButton() === 2) {
            this.jumpByStep(2);
          }
        }

        jumpByStep(step) {
          console.log('11111');

          if (this._startJump) {
            return;
          }

          this._startJump = true;
          this._jumpStep = step;
          this._curJumpTime = 0;
          this._curJumpSpeed = this._jumpStep / this._jumpTime;
          this.node.getPosition(this._curPos);
          Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0));
        }

        update(deltaTime) {
          if (this._startJump) {
            this._curJumpTime += deltaTime;

            if (this._curJumpTime > this._jumpTime) {
              // end
              this.node.setPosition(this._targetPos);
              this._startJump = false;
            } else {
              // tween
              this.node.getPosition(this._curPos);
              this._deltaPos.x = this._curJumpSpeed * deltaTime;
              Vec3.add(this._curPos, this._curPos, this._deltaPos);
              this.node.setPosition(this._curPos);
            }
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=013447090ff2754db18da3a4d2b7619a12dd2d2b.js.map