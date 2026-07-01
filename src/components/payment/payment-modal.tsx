import { useState } from "react";
import type { Movie } from "@/types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

const PaymentModal = ({ movie, onClose }: Props) => {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        {!success ? (
          <>
            <h2 className="mb-2 text-lg font-semibold">Comprar entrada</h2>
            <p className="mb-4 text-sm text-muted-foreground">{movie.title}</p>
            <div className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Número de tarjeta"
                className="w-full rounded border px-3 py-2 text-sm"
                defaultValue="4242 4242 4242 4242"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-1/2 rounded border px-3 py-2 text-sm"
                  defaultValue="12/28"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 rounded border px-3 py-2 text-sm"
                  defaultValue="123"
                />
              </div>
            </div>
            <p className="mb-4 text-right font-semibold">Total: $12.00</p>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 rounded border px-4 py-2 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handlePay}
                disabled={processing}
                className="flex-1 rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {processing ? "Procesando..." : "Pagar"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-2 text-lg font-semibold text-green-600">¡Pago exitoso!</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Tu entrada para {movie.title} fue confirmada.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Cerrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;