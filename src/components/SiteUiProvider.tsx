import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Modal } from "@/components/Modal";
import { OrderForm, type OrderPrefill } from "@/components/OrderForm";

type SiteUi = {
  openOrder: (prefill: OrderPrefill) => void;
  openChat: () => void;
  closeChat: () => void;
  chatOpen: boolean;
};

const SiteUiContext = createContext<SiteUi | null>(null);

export function useSiteUi() {
  const ctx = useContext(SiteUiContext);
  if (!ctx) throw new Error("useSiteUi must be used inside SiteUiProvider");
  return ctx;
}

export function SiteUiProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderPrefill | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const openOrder = useCallback((prefill: OrderPrefill) => {
    setChatOpen(false);
    setOrder(prefill);
  }, []);
  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  const value = useMemo(
    () => ({ openOrder, openChat, closeChat, chatOpen }),
    [openOrder, openChat, closeChat, chatOpen],
  );

  return (
    <SiteUiContext.Provider value={value}>
      {children}
      <Modal
        open={order !== null}
        onClose={() => setOrder(null)}
        label="Форма заказа"
        className="max-w-2xl"
      >
        <div className="px-6 py-12 sm:px-12">
          {order ? <OrderForm prefill={order} /> : null}
        </div>
      </Modal>
    </SiteUiContext.Provider>
  );
}
