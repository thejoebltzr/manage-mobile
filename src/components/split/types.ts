import SplitIO from '@splitsoftware/splitio-react-native/types/splitio';

/**
 * Split Status interface. It represents the current readiness state of the SDK.
 */
interface ISplitStatus {
  /**
   * isReady indicates if the Split SDK client has triggered an SDK_READY event and thus is ready to be consumed.
   */
  isReady: boolean;

  /**
   * isReadyFromCache indicates if the Split SDK client has triggered an SDK_READY_FROM_CACHE event and thus is ready to be consumed,
   * although the data in cache might be stale.
   */
  isReadyFromCache: boolean;

  /**
   * isTimedout indicates if the Split SDK client has triggered an SDK_READY_TIMED_OUT event and is not ready to be consumed.
   */
  isTimedout: boolean;

  /**
   * hasTimedout indicates if the Split SDK client has ever triggered an SDK_READY_TIMED_OUT event.
   * It's meant to keep a reference that the SDK emitted a timeout at some point, not the current state.
   */
  hasTimedout: boolean;

  /**
   * isDestroyed indicates if the Split SDK client has been destroyed.
   */
  isDestroyed: boolean;

  /**
   * Indicates when was the last status event, either SDK_READY, SDK_READY_FROM_CACHE, SDK_READY_TIMED_OUT or SDK_UPDATE.
   */
  lastUpdate: number;
}

/**
 * Split Context Value interface. It is used to define the value types of Split Context
 */
export interface ISplitContextValues extends ISplitStatus {
  /**
   * Split factory instance
   */
  factory: SplitIO.ISDK | null;

  /**
   * Split client instance
   * @see {@link https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client}
   */
  client: SplitIO.IClient | null;
}

/**
 * Update Props interface. It defines the props used to configure what SDK events are listened to update the Split context.
 * Only `SDK_UPDATE` and `SDK_READY_TIMED_OUT` are configurable.
 * The `SDK_READY` event is always listened to update the Split context value 'isReady'.
 */
export interface IUpdateProps {
  /**
   * updateOnSdkUpdate indicates if the component will update the `SplitContext` in case of a `SDK_UPDATE` event.
   * If true, components consuming the context (such as `SplitClient` and `SplitTreatments`) will re-render on SDK_UPDATE.
   * It's value is false by default.
   */
  updateOnSdkUpdate?: boolean;

  /**
   * updateOnSdkTimedout indicates if the component will update the `SplitContext` in case of a `SDK_READY_TIMED_OUT` event.
   * If true, components consuming the context (such as `SplitClient` and `SplitTreatments`) will re-render on SDK_READY_TIMED_OUT.
   * It's value is false by default.
   */
  updateOnSdkTimedout?: boolean;

  /**
   * updateOnSdkReady indicates if the component will update the `SplitContext` in case of a `SDK_READY` event.
   * If true, components consuming the context (such as `SplitClient` and `SplitTreatments`) will re-render on SDK_READY.
   * It's value is true by default.
   */
  updateOnSdkReady?: boolean;

  /**
   * updateOnSdkReadyFromCache indicates if the component will update the `SplitContext` in case of a `SDK_READY_FROM_CACHE` event.
   * If true, components consuming the context (such as `SplitClient` and `SplitTreatments`) will re-render on SDK_READY_FROM_CACHE.
   * This params is only relevant when using 'LOCALSTORAGE' as storage type, since otherwise the event is never emitted.
   * It's value is true by default.
   */
  updateOnSdkReadyFromCache?: boolean;
}
