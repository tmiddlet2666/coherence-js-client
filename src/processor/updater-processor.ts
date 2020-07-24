/*
 * Copyright (c) 2020 Oracle and/or its affiliates.
 *
 * Licensed under the Universal Permissive License v 1.0 as shown at
 * http://oss.oracle.com/licenses/upl.
 */

import { CompositeUpdater, UniversalUpdater, ValueUpdater } from '../extractor/'
import { EntryProcessor } from '.'
import { internal } from './package-internal'

export class UpdaterProcessor<K = any, V = any, T = any>
  extends EntryProcessor<K, V, boolean> {
  /**
   * The property value manipulator.
   */
  updater: ValueUpdater<V, T>

  value: T

  /**
   * Construct a PropertyProcessor for the specified property name.
   * <p>
   * This constructor assumes that the corresponding property getter will
   * have a name of ("get" + sName) and the corresponding property setter's
   * name will be ("set + sName).
   *
   * @param sName  a property name
   */
  constructor (updaterOrPropertyName: string | ValueUpdater<V, T>, value: T) {
    super(internal.processorName('UpdaterProcessor'))
    if (typeof updaterOrPropertyName === 'string') {
      const methodName = updaterOrPropertyName
      this.updater = (methodName.indexOf('.') < 0)
        ? new UniversalUpdater(methodName) // ? new ReflectionUpdater(methodName)
        : new CompositeUpdater(methodName)
    } else {
      this.updater = updaterOrPropertyName
    }
    this.value = value
  }

  static isValueManipulatorType<V, U> (arg: any): boolean {
    return arg.getExtractor && arg.getUpdater
  }
}
