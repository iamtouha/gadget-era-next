"use client";
// import { Dialog, Transition } from "@headlessui/react";
import { /*Fragment, */ useState } from "react";
import type { Order } from "@/utils/types";

function OrderActions(/* { order }: { order: Order } */) {
  // let [isOpen, setIsOpen] = useState(false);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <>
      <button
        onClick={() => window.print()}
        className="bg-primary-500 py-2 px-4 text-white transition-colors hover:bg-primary-600"
      >
        Print Invoice
      </button>
      {/* <button
        className="mx-2 px-3 py-2 transition-colors hover:bg-primary-500/20"
        onClick={openModal}
      >
        Cancel Order
      </button> */}

      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-white dark:bg-opacity-10" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Cancel this order?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-neutral-500 dark:text-neutral-300">
                      {order.status !== "shipped"
                        ? "You cannot undo this action."
                        : "Your order is alread"}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel Order
                    </button>
                    <button type="button" className="ml-4" onClick={closeModal}>
                      No, Thanks
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
}

export default OrderActions;
