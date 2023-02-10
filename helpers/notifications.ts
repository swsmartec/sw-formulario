import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

interface Props {
  message: string;
  title: string;
  toastType?: string;
}

export const notifications = ({ title, message, toastType }: Props) => {
  if (toastType === 'info') toastr.info(message, title);
  else if (toastType === 'warning') toastr.warning(message, title);
  else if (toastType === 'error') toastr.error(message, title);
  else toastr.success(message, title);
};
