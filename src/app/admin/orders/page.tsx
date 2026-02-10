"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Mail, RefreshCw, Eye, ShoppingBag, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/lib/auth-client';

interface Order {
  id: number;
  orderNumber: string;
  email: string;
  customerName: string | null;
  customerPhone: string | null;
  productSlug: string;
  productTitle: string;
  amount: string;
  currency: string;
  status: string;
  paymentProvider: string | null;
  valueCoin: string | null;
  ipnToken: string | null;
  addressIn: string | null;
  iptvUsername: string | null;
  iptvPassword: string | null;
  iptvServerUrl: string | null;
  iptvExpDate: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: { label: 'En attente', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30', icon: <Clock className="w-3.5 h-3.5" /> },
  paid: { label: 'Paye', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  provisioned: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500/20 border-green-500/30', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  failed: { label: 'Echoue', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', icon: <XCircle className="w-3.5 h-3.5" /> },
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' ? '/api/admin/orders?limit=100' : `/api/admin/orders?limit=100&status=${filter}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [filter]);

  const handleResendEmail = async (orderNumber: string) => {
    setResending(orderNumber);
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, action: 'resend_email' }),
      });

      if (response.ok) {
        toast.success('Email renvoye avec succes');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Erreur lors de l\'envoi');
      }
    } catch {
      toast.error('Erreur de connexion');
    } finally {
      setResending(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-black text-white">Commandes</h1>
              <p className="text-white/60 text-sm">Gestion des commandes et abonnements</p>
            </div>
            <button
              onClick={fetchOrders}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard
              label="Total"
              value={orders.length}
              icon={<ShoppingBag className="w-5 h-5 text-white/60" />}
            />
            <StatCard
              label="En attente"
              value={orders.filter(o => o.status === 'pending').length}
              icon={<Clock className="w-5 h-5 text-yellow-400" />}
            />
            <StatCard
              label="Actives"
              value={orders.filter(o => o.status === 'provisioned').length}
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
            />
            <StatCard
              label="Echouees"
              value={orders.filter(o => o.status === 'failed').length}
              icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'pending', 'paid', 'provisioned', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter === status
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {status === 'all' ? 'Toutes' : STATUS_CONFIG[status]?.label || status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-xl">
            <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Aucune commande trouvee</p>
          </div>
        ) : (
          <>
            {/* Orders Table */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Commande</th>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Client</th>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Produit</th>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Montant</th>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Statut</th>
                      <th className="text-left px-4 py-3 text-white/80 font-semibold text-xs">Date</th>
                      <th className="text-right px-4 py-3 text-white/80 font-semibold text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG['pending'];
                      return (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-white font-mono text-xs">{order.orderNumber}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              {order.customerName && (
                                <span className="text-white text-sm font-medium block">{order.customerName}</span>
                              )}
                              <span className="text-white/60 text-xs">{order.email}</span>
                              {order.customerPhone && (
                                <span className="text-white/40 text-xs block">{order.customerPhone}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-white/80 text-sm">{order.productTitle}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-white font-semibold text-sm">{order.amount} {order.currency}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                              {statusConfig.icon}
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-white/50 text-xs">{formatDate(order.createdAt)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-cyan-400"
                                title="Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              {order.iptvUsername && (
                                <button
                                  onClick={() => handleResendEmail(order.orderNumber)}
                                  disabled={resending === order.orderNumber}
                                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-green-400 disabled:opacity-50"
                                  title="Renvoyer l'email"
                                >
                                  {resending === order.orderNumber ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Mail className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onResendEmail={handleResendEmail}
          resending={resending}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <p className="text-white/50 text-xs">{label}</p>
    </div>
  );
}

function OrderDetailModal({ order, onClose, onResendEmail, resending }: {
  order: Order;
  onClose: () => void;
  onResendEmail: (orderNumber: string) => void;
  resending: string | null;
}) {
  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG['pending'];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Details de la commande</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">&times;</button>
        </div>

        <div className="p-6 space-y-4">
          <DetailRow label="Commande" value={order.orderNumber} mono />
          {order.customerName && <DetailRow label="Nom" value={order.customerName} />}
          <DetailRow label="Email" value={order.email} />
          {order.customerPhone && <DetailRow label="WhatsApp / Tel" value={order.customerPhone} />}
          <DetailRow label="Produit" value={order.productTitle} />
          <DetailRow label="Montant" value={`${order.amount} ${order.currency}`} />
          <DetailRow label="Statut">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </DetailRow>
          {order.paymentProvider && <DetailRow label="Provider" value={order.paymentProvider} />}
          {order.valueCoin && <DetailRow label="USDC recu" value={order.valueCoin} />}
          {order.addressIn && <DetailRow label="Wallet (address_in)" value={order.addressIn} mono />}
          {order.ipnToken && <DetailRow label="IPN Token" value={order.ipnToken} mono />}
          <DetailRow label="Date" value={new Date(order.createdAt).toLocaleString('fr-FR')} />

          {order.iptvUsername && (
            <>
              <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="text-cyan-400 font-semibold text-sm mb-3">Identifiants IPTV</h3>
                <DetailRow label="Utilisateur" value={order.iptvUsername} mono />
                <DetailRow label="Mot de passe" value={order.iptvPassword || ''} mono />
                <DetailRow label="Serveur" value={order.iptvServerUrl || ''} mono />
                {order.iptvExpDate && (
                  <DetailRow
                    label="Expiration"
                    value={new Date(order.iptvExpDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  />
                )}
              </div>

              <button
                onClick={() => onResendEmail(order.orderNumber)}
                disabled={resending === order.orderNumber}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/30 transition-all disabled:opacity-50"
              >
                {resending === order.orderNumber ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                Renvoyer l&apos;email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono, children }: {
  label: string;
  value?: string;
  mono?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-white/50 text-sm flex-shrink-0">{label}</span>
      {children || (
        <span className={`text-white text-sm text-right break-all ${mono ? 'font-mono' : ''}`}>
          {value}
        </span>
      )}
    </div>
  );
}
