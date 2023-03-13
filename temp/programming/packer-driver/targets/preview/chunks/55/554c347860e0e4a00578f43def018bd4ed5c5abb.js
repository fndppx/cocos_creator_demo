System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, instantiate, Node, PlayerController, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BlockType, GameState, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      PlayerController = _cc.PlayerController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9d5cf+ipSFGRbaXR2mBD2s8", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Prefab', 'instantiate', 'Node', 'CCInteger', 'PlayerController']);

      ({
        ccclass,
        property
      } = _decorator); // 赛道格子类型，坑（BT_NONE）或者实路（BT_STONE）

      (function (BlockType) {
        BlockType[BlockType["BT_NONE"] = 0] = "BT_NONE";
        BlockType[BlockType["BT_STONE"] = 1] = "BT_STONE";
      })(BlockType || (BlockType = {}));

      ;

      (function (GameState) {
        GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
        GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
        GameState[GameState["GS_END"] = 2] = "GS_END";
      })(GameState || (GameState = {}));

      ;

      _export("GameManager", GameManager = (_dec = ccclass("GameManager"), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: PlayerController
      }), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "cubePrfb", _descriptor, this);

          _initializerDefineProperty(this, "roadLength", _descriptor2, this);

          this._road = [];

          _initializerDefineProperty(this, "playerCtrl", _descriptor3, this);

          _initializerDefineProperty(this, "startMenu", _descriptor4, this);
        }

        start() {
          // this.generateRoad();
          this.curState = GameState.GS_INIT;
        }

        init() {
          // 激活主界面
          if (this.startMenu) {
            this.startMenu.active = true;
          } // 生成赛道


          this.generateRoad();

          if (this.playerCtrl) {
            // 禁止接收用户操作人物移动指令
            this.playerCtrl.setInputActive(false); // 重置人物位置

            this.playerCtrl.node.setPosition(Vec3.ZERO);
          }
        }

        set curState(value) {
          switch (value) {
            case GameState.GS_INIT:
              this.init();
              break;

            case GameState.GS_PLAYING:
              if (this.startMenu) {
                this.startMenu.active = false;
              } // 设置 active 为 true 时会直接开始监听鼠标事件，此时鼠标抬起事件还未派发
              // 会出现的现象就是，游戏开始的瞬间人物已经开始移动
              // 因此，这里需要做延迟处理


              setTimeout(() => {
                if (this.playerCtrl) {
                  this.playerCtrl.setInputActive(true);
                }
              }, 0.1);
              break;

            case GameState.GS_END:
              break;
          }
        }

        onStartButtonClicked() {
          console.log('开始游戏');
          this.curState = GameState.GS_PLAYING;
        }

        generateRoad() {
          // 防止游戏重新开始时，赛道还是旧的赛道
          // 因此，需要移除旧赛道，清除旧赛道数据
          this.node.removeAllChildren();
          this._road = []; // 确保游戏运行时，人物一定站在实路上

          this._road.push(BlockType.BT_STONE); // 确定好每一格赛道类型


          for (var i = 1; i < this.roadLength; i++) {
            // 如果上一格赛道是坑，那么这一格一定不能为坑
            if (this._road[i - 1] === BlockType.BT_NONE) {
              this._road.push(BlockType.BT_STONE);
            } else {
              this._road.push(Math.floor(Math.random() * 2));
            }
          } // 根据赛道类型生成赛道


          for (var j = 0; j < this._road.length; j++) {
            var block = this.spawnBlockByType(this._road[j]); // 判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）

            if (block) {
              this.node.addChild(block);
              block.setPosition(j, -1.5, 0);
            }
          }
        }

        spawnBlockByType(type) {
          if (!this.cubePrfb) {
            return null;
          }

          var block = null; // 赛道类型为实路才生成

          switch (type) {
            case BlockType.BT_STONE:
              block = instantiate(this.cubePrfb);
              break;
          }

          return block;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "roadLength", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerCtrl", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=554c347860e0e4a00578f43def018bd4ed5c5abb.js.map